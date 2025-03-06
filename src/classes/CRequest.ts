import { v4 as uuid } from 'uuid';
import type { APIContext, AstroCookies } from 'astro';
import { API_PREFIX, PAGE_LOGIN } from '@utils/configs';
import { isHtml, isJson } from '@utils/string';

export class CRequest {
  _uuid: string;
  _end: number = 0;
  _start: number;

  _logs: Array<string> = [];
  _request: Request;
  _responseText: string = '';
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
    this._uuid = uuid();

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

  public setEnd(responseText: string) {
    this._end = Date.now();
    this._responseText = responseText;
  }

  public async toJson() {
    const resp = this._responseText;
    const format = isHtml(resp) && 'html'
      || isJson(resp) && 'json'
      || '!undefined';

    const postData = this.isPost && await this._request.json() || {};

    const data = {
      delay: this._end - this._start,
      end: new Date(this._end).toISOString(),
      isApiRequest: this.isApiRequest,
      method: this._request?.method,
      pathname: this.pathname,
      postData,
      response: {
        format,
        size: resp.toString().length,
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
}
