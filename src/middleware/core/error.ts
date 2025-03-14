import { defineMiddleware } from 'astro:middleware';
import { CError } from '@classes/CError';

export const errorMiddleware = defineMiddleware(async (context, next) => {
  const result = await next().catch(err => err);
  const response = result instanceof Response && result;
  const error = result instanceof CError && result
    || result instanceof Error && result;

  const { logger, request } = context.locals;

  if (error) {
    await logger.writeLogs(null, error);
  }

  return response || error?.toResponse?.() || CError.baseErrorToResponse(error, request.uuid);
});
