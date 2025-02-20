import type { APIContext, AstroCookies } from 'astro';
import { PAGE_LOGIN } from '@utils/configs';

export class CRequest {
  _end: number = 0;
  _start: number;

  _request: Request;
  _url: URL;

  cookies: AstroCookies;
  isGet: boolean;
  isPost: boolean;
  pathname: string;

  isPageLogin: boolean;

  constructor(context: APIContext) {
    this._start = Date.now();
    this._request = context?.request;
    this._url = context?.url;

    this.cookies = context?.cookies;
    this.isGet = context.request.method === 'GET';
    this.isPost = context.request.method === 'POST';
    this.pathname = context?.url?.pathname;

    this.isPageLogin = this.pathname === PAGE_LOGIN;
  }

  public setEnd() {
    this._end = Date.now();
  }

  public toJson() {
    const data = {
      pathname: this.pathname,
      delay: this._end - this._start,
      start: new Date(this._start).toISOString(),
      method: this._request?.method,
    };
    return JSON.stringify(data);
  }
}
