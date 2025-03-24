type optsParam = {
  expires?: Date;
  maxAge?: number;
  path?: string;
};

export class CCookie {
  static _isParsed = false;
  static _parsedDocumentCookies = new Map();

  static deleteDocumentCookie(cookieName: string): void {
    this.setDocumentCookie(cookieName, '', { maxAge: -1 });
  };

  static getDocumentCookie(cookieName: string): number | string | null {
    if (!this._isParsed) {
      const arr = document.cookie.split('; ').map(entry => {
        const [key, value] = entry.split('=');
        return [key, parseFloat(value) || value];
      });
      this._parsedDocumentCookies = new Map(arr);
      this._isParsed = true;
    }

    if (!this._parsedDocumentCookies.has(cookieName)) {
      console.error(`[getCookie] unable to get cookie "${cookieName}"`);
      return null;
    }

    return this._parsedDocumentCookies.get(cookieName);
  };

  static setDocumentCookie(cookieName: string, value: number | string, opts: optsParam = {}): void {
    const options = [
      opts.expires && `expires=${opts.expires}`,
      opts.maxAge && `max-age=${opts.maxAge}`,
      `path=${opts.path || '/'}`,
    ].filter(Boolean);

    const newStr = `${cookieName}=${value};${options.join(';')};`;
    /*
    console.log('[setDocumentCookie]', {
      cookieName,
      newStr,
      options,
      opts,
      value,
    });
    */
    document.cookie = newStr;
    if (this._parsedDocumentCookies.has(cookieName)) {
      this._parsedDocumentCookies.delete(cookieName);
    }
  };
};
