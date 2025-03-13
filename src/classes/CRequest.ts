import type { APIContext, AstroCookies } from 'astro';
import { v4 as uuid } from 'uuid';
import { API_PREFIX, PAGE_LOGIN } from '@utils/configs';
import { isHtml, isJson } from '@utils/string';

const RESTRICTED_APIS = ['logs'];
const RESTRICTED_REGEXP = new RegExp(`^\/api\/v\\d+\/(${RESTRICTED_APIS.join('|')})$`);

export class CRequest {
  _uuid: string;
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
  isApiRestricted: boolean;
  isPageLogin: boolean;

  constructor(context: APIContext) {
    this._start = Date.now();
    this._request = context?.request.clone();
    this._url = context?.url;
    this._uuid = uuid();

    this.cookies = context?.cookies;
    this.isGet = this._request.method === 'GET';
    this.isPost = this._request.method === 'POST';
    this.pathname = context?.url?.pathname;

    this.isApiRequest = this.pathname.startsWith(API_PREFIX);
    this.isApiRestricted = RESTRICTED_REGEXP.test(this.pathname);
    this.isPageLogin = this.pathname === PAGE_LOGIN;
  }

  public addLog(data: string) {
    this._logs.push(data);
  }

  public getError(): Response | null {
    return this._error && new Response(JSON.stringify({
      error: this._error.error,
      errorCode: this._error.errorCode,
      message: this._error.message,
    }), {
      status: this._error.status,
      statusText: this._error.statusText,
    });
  }

  public hasError(): boolean {
    return !!this._error;
  }

  public setEnd(response: Response) {
    this._end = Date.now();
    this._response = response;
  }

  public setError(obj) {
    this._error = obj;
  }

  public toError() {
    const data = {
      error: this._error,
      uuid: this._uuid,
    };
    return this._error ? JSON.stringify(data) : '';
  }

  public async toJson() {
    const responseText = (await this._response?.text().catch(() => '')) || '';

    const format = isHtml(responseText) && 'html'
      || isJson(responseText) && 'json'
      || '!undefined';

    const postData = this.isPost && await this._request.json() || {};

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
      uuid: this._uuid,
    };

    return JSON.stringify(data);
  }

  public toLogs() {
    const data = {
      logs: this._logs,
      uuid: this._uuid,
    };
    return this._logs.length > 0 ? JSON.stringify(data) : '';
  };
};
