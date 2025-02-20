import type { APIRoute } from 'astro';
import { COOKIE_AUTH } from '@utils/configs';

export const POST: APIRoute = async ({ cookies }) => {
  const wasLoggedIn = cookies.has(COOKIE_AUTH);
  cookies.delete(COOKIE_AUTH);
  const isLoggedIn = cookies.has(COOKIE_AUTH);

  return new Response(JSON.stringify({
    was: wasLoggedIn,
    is: isLoggedIn,
    action: 'delete',
  }));
};
