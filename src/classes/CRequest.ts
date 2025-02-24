import type { APIContext, AstroCookies } from 'astro';
import { API_PREFIX, PAGE_LOGIN } from '@utils/configs';

export class CRequest {
  _end: number = 0;
  _start: number;

  _request: Request;
  _url: URL;

  cookies: AstroCookies;
  isGet: boolean;
  isPost: boolean;
  pathname: string;

  isApiRequest: boolean;
  isPageLogin: boolean;

  constructor(context: APIContext) {
    this._start = Date.now();
    this._request = context?.request;
    this._url = context?.url;

    this.cookies = context?.cookies;
    this.isGet = context.request.method === 'GET';
    this.isPost = context.request.method === 'POST';
    this.pathname = context?.url?.pathname;

    this.isApiRequest = this.pathname.startsWith(API_PREFIX);
    this.isPageLogin = this.pathname === PAGE_LOGIN;
  }

  public setEnd() {
    this._end = Date.now();
  }

  public toJson() {
    const data = {
      delay: this._end - this._start,
      method: this._request?.method,
      pathname: this.pathname,
      start: new Date(this._start).toISOString(),
    };
    return JSON.stringify(data);
  }
}
