import { STATUS_TEXT } from '@utils/status';

export class CResponse {
  static quickJson(content: object, status: number = 200): Response {
    const str = JSON.stringify(content);
    return new Response(str, {
      headers: new Headers({
        'Content-Length': str.length,
        'Content-Type': 'application/json;charset=utf-8',
      }),
      status,
      statusText: STATUS_TEXT[status],
    });
  }

  static quickHtml(content: string, status: number = 200): Response {
    return new Response(content, {
      headers: new Headers({
        'Content-Length': content.length,
        'Content-Type': 'text/html;charset=utf-8',
      }),
      status,
      statusText: STATUS_TEXT[status],
    });
  }

  static quickText(content: string, status: number = 200): Response {
    return new Response(content, {
      headers: new Headers({
        'Content-Length': content.length,
        'Content-Type': 'text/plain;charset=utf-8',
      }),
      status,
      statusText: STATUS_TEXT[status],
    });
  }
}
