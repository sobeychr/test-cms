import type { APIRoute } from 'astro';
import { COOKIE_AUTH_DURATION, COOKIE_AUTH_NAME } from '@utils/configs';
import { generateMockJwt } from '@utils/data';

export const POST: APIRoute = async ({ cookies, request }) => {
  const body = await request.json();
  const token = generateMockJwt({ email: body.email });
  cookies.set(COOKIE_AUTH_NAME, token, { maxAge: COOKIE_AUTH_DURATION, path: '/' });

  return new Response(JSON.stringify({
    actions: ['reload'],
    success: true,
  }));
};
