import type { APIRoute } from 'astro';
import { COOKIE_AUTH_NAME, PAGE_LOGIN } from '@utils/configs';
import { parseJwt } from '@utils/data';

export const POST: APIRoute = async ({ cookies, locals }) => {
  const cookieValue = cookies.get(COOKIE_AUTH_NAME, { path: '/' })?.value || '';
  const { email } = parseJwt(cookieValue);

  cookies.delete(COOKIE_AUTH_NAME, { path: '/' });

  const CRequest = locals.request;
  CRequest.addLog(`[LOGOUT,success] logged out "${email}"`);

  return new Response(JSON.stringify({
    actions: [
      {
        command: 'redirect',
        param: PAGE_LOGIN,
      }],
    success: true,
  }));
};
