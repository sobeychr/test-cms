import { redirect } from '@sveltejs/kit';
import { CONFIG } from '$lib/util/config';
import { deleteCookie } from '$lib/util/cookie';

const { COOKIE_TOKEN, PAGE_HOME, PAGE_LOGIN, PAGE_LOGOUT } = CONFIG;

export const handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  const searchParams = event.url.searchParams;

  const isLogout = searchParams.has('/logout');

  const userToken = event.cookies.get(COOKIE_TOKEN);

  if(isLogout) {
    deleteCookie(event.cookies, COOKIE_TOKEN);
    return redirect(301, PAGE_LOGIN);
  }
  if(!userToken && pathname !== PAGE_LOGIN) {
    return redirect(301, PAGE_LOGIN);
  }
  if(!!userToken && pathname === PAGE_LOGIN) {
    return redirect(301, PAGE_HOME);
  }

  const response = await resolve(event);
  return response;
};
