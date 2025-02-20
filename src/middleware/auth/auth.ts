import { PAGE_HOME, PAGE_LOGIN } from '@utils/configs';
import { defineMiddleware } from 'astro:middleware';

export const authMiddleware = defineMiddleware((context, next) => {
  const { request, user } = context.locals;

  if (!user.isLoggedIn && !request.isPageLogin) {
    return context.redirect(PAGE_LOGIN);
  }

  if (user.isLoggedIn && request.isPageLogin) {
    return context.redirect(PAGE_HOME);
  }

  return next();
});
