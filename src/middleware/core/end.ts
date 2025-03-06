import { defineMiddleware } from 'astro:middleware';
import { writeFileSync } from 'fs';
import { LOGS_DIR } from '@utils/configs';

export const endMiddleware = defineMiddleware(async (context, next) => {
  const response = await next();
  const request = context.locals.request;

  const responseText = (await response.clone().text()) || '';
  request.setEnd(responseText);

  const requestLog = await request.toJson() + '\n';
  writeFileSync(`${LOGS_DIR}/request.log`, requestLog, { encoding: 'utf8', flag: 'a' });

  const detailLog = request.toLogs();
  if (detailLog) {
    writeFileSync(`${LOGS_DIR}/info.log`, detailLog + '\n', { encoding: 'utf8', flag: 'a' });
  }

  return response;
});
