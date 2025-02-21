import type { APIRoute } from 'astro';
import { COOKIE_AUTH_NAME } from '@utils/configs';

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(COOKIE_AUTH_NAME);

  return new Response(JSON.stringify({
    action: ['reload'],
    success: true,
  }));
};
