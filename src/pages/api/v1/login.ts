import type { APIRoute } from 'astro';
import { CJWT } from '@classes/CJWT';
import { CResponse } from '@classes/CResponse';
import { COOKIE_AUTH_DURATION, COOKIE_AUTH_NAME } from '@utils/configs';

export const POST: APIRoute = async ({ cookies, locals, request }) => {
  const { email } = await request.json() || {};

  const token = CJWT.generateMock({ email });
  cookies.set(COOKIE_AUTH_NAME, token, { maxAge: COOKIE_AUTH_DURATION, path: '/' });

  const CRequest = locals.request;
  CRequest.addLog(`[LOGIN,success] logged in "${email}"`);

  return CResponse.quickJson({
    actions: [{
      command: 'redirect',
      param: '/',
    }],
    success: true,
  });
};
