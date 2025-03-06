import type { APIContext, AstroCookies } from 'astro';
import { API_PREFIX, PAGE_LOGIN } from '@utils/configs';
import { isHtml, isJson } from '@utils/string';

export class CRequest {
  _end: number = 0;
  _start: number;

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
    this._request = context?.request;
    this._url = context?.url;

    this.cookies = context?.cookies;
    this.isGet = context.request.method === 'GET';
    this.isPost = context.request.method === 'POST';
    this.pathname = context?.url?.pathname;

    this.isApiRequest = this.pathname.startsWith(API_PREFIX);
    this.isPageLogin = this.pathname === PAGE_LOGIN;
  }

  public setEnd(responseText: string) {
    this._end = Date.now();
    this._responseText = responseText;
  }

  public toJson() {
    const resp = this._responseText;
    const format = isHtml(resp) && 'html'
      || isJson(resp) && 'json'
      || '!undefined';

    const data = {
      delay: this._end - this._start,
      end: new Date(this._end).toISOString(),
      isApiRequest: this.isApiRequest,
      method: this._request?.method,
      pathname: this.pathname,
      response: {
        format,
        size: resp.toString().length,
      },
      search: this._url?.search || '',
      start: new Date(this._start).toISOString(),
    };
    return JSON.stringify(data);
  }
}
