import type { APIContext } from 'astro';
import { CError } from '@classes/CError';
import { COOKIE_AUTH_NAME, PAGE_HOME, PAGE_LOGIN } from '@utils/configs';
import { ERRORS } from '@utils/errors';

const PATH_TO_INVALID = [
  '/api/v1/logs',
];

export class CAuthController {
  static validateApi(context: APIContext): void {
    const { request, request: { cookies } } = context.locals;

    if (PATH_TO_INVALID.includes(request.pathname) && !cookies.has(COOKIE_AUTH_NAME)) {
      const error = new CError(ERRORS.cookieAuth);
      error.addDetail('auth cookie missing');
      throw error;
    }
  }

  static validateLogin(context: APIContext): string | null {
    const { request, user } = context.locals;

    if (!request.isApiRequest) {
      if (!user.isLoggedIn && !request.isPageLogin) {
        return PAGE_LOGIN;
      }

      if (user.isLoggedIn && request.isPageLogin) {
        return PAGE_HOME;
      }
    }

    return null;
  }
};
