import { writeFileSync } from 'fs';
import type { CError } from '@classes/CError';
import type { CRequest } from '@classes/CRequest';
import { LOGS_DIR } from '@utils/configs';

const OPTIONS = { encoding: 'utf8', flag: 'a' };

export class CLogger {
  _request: CRequest;

  constructor(request: CRequest) {
    this._request = request;
  }

  async writeLogs(response: Response, error: CError): void {
    this._request.setEnd(response?.clone?.());

    const requestLog = await this._request.toJson();
    writeFileSync(`${LOGS_DIR}request.log`, requestLog + '\n', OPTIONS);

    const detailLog = this._request.toDetails();
    if (detailLog) {
      writeFileSync(`${LOGS_DIR}info.log`, detailLog + '\n', OPTIONS);
    }

    if (error) {
      const errorLog = error.toLog(this._request.uuid);
      writeFileSync(`${LOGS_DIR}error.log`, errorLog + '\n', OPTIONS);
    }
  }
}
