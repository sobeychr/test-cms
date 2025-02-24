import type { APIRoute } from 'astro';
import { COOKIE_AUTH_NAME, PAGE_LOGIN } from '@utils/configs';

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(COOKIE_AUTH_NAME);

  return new Response(JSON.stringify({
    actions: [
      {
        command: 'deleteCookie',
        param: COOKIE_AUTH_NAME,
      },
      {
        command: 'redirect',
        param: PAGE_LOGIN,
      }],
    success: true,
  }));
};
