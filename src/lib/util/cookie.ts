import { CONFIG } from '$lib/util/config';

const { COOKIE_DURATION } = CONFIG;

export const setCookie = (cookieObj, name, value, opts = {}) => {
  if(!cookieObj.set) {
    throw new Error('[$lib/util/cookie:setCookie()] Invalid cookie object. It must be server > event.cookies');
  }

  const options = {
    httpOnly: true,
    maxAge: COOKIE_DURATION * (opts.expires || 1),
    path: opts.path || '/',
    sameSite: 'strict',
    secure: false,
  }
  cookieObj.set(name, value, options);
};
