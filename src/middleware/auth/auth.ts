import { defineMiddleware } from 'astro:middleware';
import { CAuthController } from '@classes/controller/CAuthController';

export const authMiddleware = defineMiddleware((context, next) => {
  CAuthController.validateApi(context);

  const loginRedirect = CAuthController.validateLogin(context);
  if (loginRedirect) {
    return context.redirect(loginRedirect);
  }

  return next();
});
