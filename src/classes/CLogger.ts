import { writeFileSync, type ObjectEncodingOptions } from 'fs';
import { CError } from '@classes/CError';
import type { CRequest } from '@classes/CRequest';
import { LOGS_DIR } from '@utils/configs';

const OPTIONS = { encoding: 'utf8', flag: 'a' } as ObjectEncodingOptions;

export class CLogger {
  _request: CRequest;

  constructor(request: CRequest) {
    this._request = request;
  }

  _writeLog(filename: string, data: string) {
    writeFileSync(`${LOGS_DIR}${filename}.log`, data + '\n', OPTIONS);
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
}
