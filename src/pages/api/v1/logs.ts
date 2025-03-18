import type { APIRoute } from 'astro';
import { CLogger } from '@classes/CLogger';
import { CResponse } from '@classes/CResponse';

export const GET: APIRoute = async ({ url }) => {
  const getLimit = parseInt(url.searchParams?.get('limit'), 10) || 10;
  const limit = Math.min(50, Math.max(1, getLimit));

  const errors = CLogger.getLogs('error', limit);
  const infos = CLogger.getLogs('info', limit);
  const requests = CLogger.getLogs('request', limit);

  return CResponse.quickJson({
    errors,
    infos,
    requests,
  });
};;
