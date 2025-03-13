import type { APIRoute } from 'astro';
import { spawnSync } from 'node:child_process';
import { LOGS_DIR } from '@utils/configs';
import { isJson } from '@utils/string';

const OPTIONS = { encoding: 'utf-8', timeout: 250 };

export const GET: APIRoute = async ({ url }) => {
  const getLimit = parseInt(url.searchParams?.get('limit'), 10) || 10;
  const limit = Math.min(50, Math.max(1, getLimit));

  const params = [`-n ${limit}`, '-f', `${LOGS_DIR}request.log`];
  const data = spawnSync('tail', params, OPTIONS);
  const dataStr = (data?.stdout || '');

  const entries = dataStr.split('\n').filter(isJson).map(line => JSON.parse(line));

  return new Response(JSON.stringify({
    entries,
  }));
};;
