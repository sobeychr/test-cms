import { IS_DEV } from '@utils/configs';
import { STATUS_TEXT } from '@utils/configs';
import { CResponse } from './CResponse';

type CErrorParam = {
  code: number;
  message: string;
  status: number;
};

export class CError implements CErrorParam {
  code;
  details: Array<string> = [];
  message;
  status;

  constructor({ code, message, status }: CErrorParam) {
    this.code = code;
    this.message = message;
    this.status = status;

    Object.freeze(this);
  }

  addDetail(message: string): void {
    this.details.push(message);
  }

  toLog(uuid: string): string {
    const data = {
      code: this.code,
      details: this.details,
      message: this.message,
      status: this.status,
      uuid,
    };
    return JSON.stringify(data);
  }

  toResponse(): Response {
    const data = {
      code: this.code,
      message: this.message,
    };
    if (IS_DEV) {
      data.details = this.details;
    }
    return CResponse.quickJson(data, this.status);
  }

  static _getStack(error: Error): string {
    const stack = error.stack || '';
    return stack.split('\n').map(line => line.trim()).slice(0, 5).join(' ');
  }

  static baseErrorToLog(error: Error, uuid: string): string {
    const data = {
      code: 500,
      columnNumber: error.columnNumber,
      fileName: error.fileName,
      lineNumber: error.lineNumber,
      message: error.message,
      name: error.name,
      stack: this._getStack(error),
      uuid,
    };
    return JSON.stringify(data);
  }

  static baseErrorToResponse(error: Error, uuid: string): Response {
    const data = {
      code: 500,
      message: error.message,
      name: error.name,
    };

    if (IS_DEV) {
      data.columnNumber = error.columnNumber;
      data.fileName = error.fileName;
      data.lineNumber = error.lineNumber;
      data.stack = this._getStack(error);
      data.uuid = uuid;
    }

    const meta = { status: 500, statusText: STATUS_TEXT[500] };
    return new Response(JSON.stringify(data), meta);
  }
};
