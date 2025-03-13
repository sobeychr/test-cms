import { defineMiddleware } from 'astro:middleware';
import { writeFileSync } from 'fs';
import { LOGS_DIR } from '@utils/configs';

const OPTIONS = { encoding: 'utf8', flag: 'a' };

export const endMiddleware = defineMiddleware(async (context, next) => {
  const request = context.locals.request;
  const response = request.getError() || await next();

  request.setEnd(response.clone());

  const requestLog = await request.toJson();
  writeFileSync(`${LOGS_DIR}request.log`, requestLog + '\n', OPTIONS);

  const detailLog = request.toLogs();
  if (detailLog) {
    writeFileSync(`${LOGS_DIR}info.log`, detailLog + '\n', OPTIONS);
  }

  const errorLog = request.toError();
  console.log('err', errorLog);
  if (errorLog) {
    writeFileSync(`${LOGS_DIR}error.log`, errorLog + '\n', OPTIONS);
  }

  return response;
});
