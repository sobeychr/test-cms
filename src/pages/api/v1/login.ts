import type { APIRoute } from 'astro';
import { CResponse } from '@classes/CResponse';
import { COOKIE_AUTH_DURATION, COOKIE_AUTH_NAME } from '@utils/configs';
import { generateMockJwt } from '@utils/data';

export const POST: APIRoute = async ({ cookies, locals, request }) => {
  const body = await request.json();
  const token = generateMockJwt({ email: body.email });
  cookies.set(COOKIE_AUTH_NAME, token, { maxAge: COOKIE_AUTH_DURATION, path: '/' });

  const CRequest = locals.request;
  CRequest.addLog(`[LOGIN,success] logged in "${body.email}"`);

  return CResponse.quickJson({
    actions: [{
      command: 'redirect',
      param: '/',
    }],
    success: true,
  });
};
