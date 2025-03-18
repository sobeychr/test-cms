import { type ObjectEncodingOptions, readFileSync, writeFileSync } from 'fs';
import { spawnSync } from 'node:child_process';
import { CError } from '@classes/CError';
import type { CRequest } from '@classes/CRequest';
import { LOGS_DIR } from '@utils/configs';
import { logStrToArray } from '@utils/data';

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

    const requestLog = await this._request.toJson();
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

  static getAllLogs(filename: string) {
    const requestStr = readFileSync(`${LOGS_DIR}${filename}.log`, OPTS_READ);
    return logStrToArray(requestStr);
  }

  static getLogs(filename: string, limit: number): Array<string> {
    const params = [`-n ${limit}`, '-f', `${LOGS_DIR}${filename}.log`];
    const data = spawnSync('tail', params, OPTS_READ);
    const dataStr = (data?.stdout || '');
    return logStrToArray(dataStr);
  }
}
