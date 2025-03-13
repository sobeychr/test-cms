import { defineMiddleware } from 'astro:middleware';
import { COOKIE_AUTH_NAME, PAGE_HOME, PAGE_LOGIN } from '@utils/configs';

export const authMiddleware = defineMiddleware((context, next) => {
  const { request, user } = context.locals;
  const { cookies } = request;

  if (request.isApiRestricted && !cookies.has(COOKIE_AUTH_NAME)) {
    // if (request.isApiRestricted) {
    request.setError({
      error: 'Unauthorized',
      errorCode: 1001,
      message: 'Missing auth cookie',
      status: 401,
      statusText: 'Unauthorized',
    });
    return next();
  }

  if (!request.isApiRequest) {
    if (!user.isLoggedIn && !request.isPageLogin) {
      return context.redirect(PAGE_LOGIN);
    }

    if (user.isLoggedIn && request.isPageLogin) {
      return context.redirect(PAGE_HOME);
    }
  }

  return next();
});
