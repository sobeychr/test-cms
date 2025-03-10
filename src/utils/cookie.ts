let parsedCookies = new Map();

export const deleteCookie = (cookieName: string) => {
  setCookie(cookieName, '', { maxAge: -1 });
};

export const getCookie = (cookieName: string) => {
  if (parsedCookies.size === 0) {
    const arr = document.cookie.split('; ').map(entry => entry.split('='));
    parsedCookies = new Map(arr);
  }

  if (!parsedCookies.has(cookieName)) {
    console.error(`[getCookie] unable to get cookie "${cookieName}"`);
    return null;
  }

  return parsedCookies.get(cookieName);
};

type optsParam = {
  expires?: Date;
  maxAge?: number;
  path?: string;
};
export const setCookie = (cookieName: string, value: number | string, opts: optsParam = {}) => {
  const options = [
    opts.expires && `expires=${opts.expires}`,
    opts.maxAge && `max-age=${opts.maxAge}`,
    `path=${opts.path || '/'}`,
  ].filter(Boolean);

  const newStr = `${cookieName}=${value};${options.join(';')};`;
  /*
  console.log('[setCookie]', {
    cookieName,
    newStr,
    options,
    opts,
    value,
  });
  */
  document.cookie = newStr;
  if (parsedCookies.has(cookieName)) {
    parsedCookies.delete(cookieName);
  }
};
