import { redirect } from '@sveltejs/kit';
import { CONFIG } from '$lib/util/config';

const { COOKIE_TOKEN, PAGE_HOME, PAGE_LOGIN } = CONFIG;

export const handle = async ({ event, resolve }) => {
  const userToken = event.cookies.get(COOKIE_TOKEN);
  const pathname = event.url.pathname;

  if(!userToken && pathname !== PAGE_LOGIN) {
    return redirect(301, PAGE_LOGIN);
  }
  if(!!userToken && pathname === PAGE_LOGIN) {
    return redirect(301, PAGE_HOME);
  }

  const response = await resolve(event);
  return response;
};
