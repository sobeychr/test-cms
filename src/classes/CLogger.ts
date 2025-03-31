import { spawnSync } from 'node:child_process';
import { existsSync, type ObjectEncodingOptions, readFileSync, writeFileSync } from 'node:fs';
import { CError } from '@classes/CError';
import type { CRequest } from '@classes/CRequest';
import { LOGS_DIR } from '@utils/configs';
import { isJson } from '@utils/string';

const OPTS_READ = { encoding: 'utf-8', timeout: 250 };
const OPTS_WRITE = { encoding: 'utf8', flag: 'a' } as ObjectEncodingOptions;

export class CLogger {
  _request: CRequest;

  constructor(request: CRequest) {
    this._request = request;
  }

  _writeLog(filename: string, data: string): void {
    writeFileSync(`${LOGS_DIR}${filename}.log`, data + '\n', OPTS_WRITE);
  }

  async writeLogs(response: Response, error: CError | Error): Promise<void> {
    this._request.setEnd(response?.clone?.());

    const requestLog = await this._request.toJson(error);
    this._writeLog('request', requestLog);

    const infoLog = this._request.toDetails();
    if (infoLog) {
      this._writeLog('info', infoLog);
    }

    if (error) {
      const errorLog = error.toLog?.(this._request.uuid)
        || CError.baseErrorToLog(error, this._request.uuid);
      this._writeLog('error', errorLog);
    }
  }

  static getAllLogs(filename: string): Array<object> {
    const path = `${LOGS_DIR}${filename}.log`;
    if (!existsSync(path)) {
      return [];
    }

    const requestStr = readFileSync(path, OPTS_READ);
    return this._logStringToArray(requestStr);
  }

  static getLogs(filename: string, limit: number): Array<object> {
    const path = `${LOGS_DIR}${filename}.log`;
    if (!existsSync(path)) {
      return [];
    }

    const params = [`-n ${limit}`, '-f', path];
    const data = spawnSync('tail', params, OPTS_READ);
    const dataStr = (data?.stdout || '');
    return this._logStringToArray(dataStr);
  }

  static _logStringToArray(filestring: string): Array<object> {
    return filestring.split('\n').filter(isJson).map(line => JSON.parse(line));
  }
}
