import { defineMiddleware } from 'astro:middleware';

export const authMiddleware = defineMiddleware((context, next) => {
  // console.log('co', context);

  return next();
});
