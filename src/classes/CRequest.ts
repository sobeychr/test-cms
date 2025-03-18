import type { APIContext, AstroCookies } from 'astro';
import { CID } from '@classes/CID';
import { API_PREFIX, PAGE_LOGIN } from '@utils/configs';
import { isHtml, isJson } from '@utils/string';

const PROTECTED_POST = ['password'];

export class CRequest {
  uuid: string;
  _end: number = 0;
  _start: number;

  _error: object | null = null;
  _logs: Array<string> = [];
  _request: Request;
  _response: Response | null = null;
  _url: URL;

  cookies: AstroCookies;
  isGet: boolean;
  isPost: boolean;
  pathname: string;

  isApiRequest: boolean;
  isPageLogin: boolean;

  constructor(context: APIContext) {
    this._start = Date.now();
    this._request = context?.request.clone();
    this._url = context?.url;
    this.uuid = CID.uuid();

    this.cookies = context?.cookies;
    this.isGet = this._request.method === 'GET';
    this.isPost = this._request.method === 'POST';
    this.pathname = context?.url?.pathname;

    this.isApiRequest = this.pathname.startsWith(API_PREFIX);
    this.isPageLogin = this.pathname === PAGE_LOGIN;
  }

  public addLog(data: string) {
    this._logs.push(data);
  }

  public setEnd(response: Response) {
    this._end = Date.now();
    this._response = response;
  }

  public toDetails() {
    const data = {
      logs: this._logs,
      uuid: this.uuid,
    };
    return this._logs.length > 0 ? JSON.stringify(data) : '';
  };

  public async toJson(): Promise<string> {
    const responseText = (await this._response?.text().catch(() => '')) || '';

    const format = isHtml(responseText) && 'html'
      || isJson(responseText) && 'json'
      || '!undefined';

    const postData = this.isPost && await this._request.json() || {};
    PROTECTED_POST.filter(field => !!postData[field]).forEach(field => { postData[field] = '!secret'; });

    const status = this._response?.status;

    const data = {
      delay: this._end - this._start,
      end: new Date(this._end).toISOString(),
      isApiRequest: this.isApiRequest,
      method: this._request?.method,
      pathname: this.pathname,
      postData,
      response: {
        format,
        size: responseText.toString().length,
        status,
      },
      search: this._url?.search || '',
      start: new Date(this._start).toISOString(),
      uuid: this.uuid,
    };

    return JSON.stringify(data);
  }
};
