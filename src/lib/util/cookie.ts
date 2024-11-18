import { CONFIG } from '$lib/util/config';

const { COOKIE_DURATION } = CONFIG;

export const deleteCookie = (cookieObj, name, opts = {}) => {
  if(!cookieObj.delete) {
    throw new Error('[$lib/util/cookie:deleteCookie()] Invalid cookie object. It must be server > event.cookies');
  }

  const options = {
    httpOnly: true,
    path: opts.path || '/',
    sameSite: 'strict',
    secure: false,
  }
  cookieObj.delete(name, options);
};

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
