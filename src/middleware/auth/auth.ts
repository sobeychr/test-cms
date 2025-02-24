import { defineMiddleware } from 'astro:middleware';
import { PAGE_HOME, PAGE_LOGIN } from '@utils/configs';

export const authMiddleware = defineMiddleware((context, next) => {
  const { request, user } = context.locals;

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
