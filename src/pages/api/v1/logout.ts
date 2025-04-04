import type { APIRoute } from 'astro';
import { CJWT } from '@classes/CJWT';
import { CResponse } from '@classes/CResponse';
import { COOKIE_AUTH_NAME, PAGE_LOGIN } from '@utils/configs';

export const POST: APIRoute = async ({ cookies, locals }) => {
  const cookieValue = cookies.get(COOKIE_AUTH_NAME, { path: '/' })?.value || '';
  const { email } = CJWT.parseJwt(cookieValue) || {};

  cookies.delete(COOKIE_AUTH_NAME, { path: '/' });

  const CRequest = locals.request;
  CRequest.addLog(`[LOGOUT,success] logged out "${email}"`);

  return CResponse.quickJson({
    actions: [
      {
        command: 'redirect',
        param: PAGE_LOGIN,
      }],
    success: true,
  });
};
