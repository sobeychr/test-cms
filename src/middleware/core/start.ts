import { defineMiddleware } from 'astro:middleware';
import { CLogger } from '@classes/CLogger';
import { CRequest } from '@classes/CRequest';
import { CUser } from '@classes/CUser';

export const startMiddleware = defineMiddleware((context, next) => {
  const request = new CRequest(context);

  context.locals.logger = new CLogger(request);
  context.locals.request = request;
  context.locals.user = new CUser(request);

  return next();
});
