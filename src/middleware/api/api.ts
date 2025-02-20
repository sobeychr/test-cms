import { defineMiddleware } from 'astro:middleware';

export const apiMiddleware = defineMiddleware((_context, next) => {
  /*
  export const apiMiddleware = defineMiddleware((context, next) => {
    const { request } = context.locals;
  
    if (request.isApiRequest) {
  
    }
    */

  return next();
});
