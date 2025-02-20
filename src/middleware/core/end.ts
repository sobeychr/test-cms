import { defineMiddleware } from 'astro:middleware';
// import { writeFileSync } from 'fs';

export const endMiddleware = defineMiddleware(async (context, next) => {
  const response = await next();

  const request = context.locals.request;
  request.setEnd();

  // console.log('request', request.toJson());

  return response;
});
