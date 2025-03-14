import { IS_DEV } from '@utils/configs';
import { STATUS_TEXT } from '@utils/error';

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

    const meta = { status: this.status, statusText: STATUS_TEXT[this.status] };
    return new Response(JSON.stringify(data), meta);
  }
};
