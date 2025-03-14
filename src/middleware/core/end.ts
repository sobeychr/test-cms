import { defineMiddleware } from 'astro:middleware';

export const endMiddleware = defineMiddleware(async (context, next) => {
  const logger = context.locals.logger;
  const response = await next();

  await logger.writeLogs(response);

  return response;
});
