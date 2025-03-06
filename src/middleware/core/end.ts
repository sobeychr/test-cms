import { defineMiddleware } from 'astro:middleware';
import { writeFileSync } from 'fs';

export const endMiddleware = defineMiddleware(async (context, next) => {
  const response = await next();
  const request = context.locals.request;

  const responseText = (await response.clone().text()) || '';
  request.setEnd(responseText);

  const data = request.toJson() + '\n';
  writeFileSync('./logs/info.log', data, { encoding: 'utf8', flag: 'a' });

  return response;
});
