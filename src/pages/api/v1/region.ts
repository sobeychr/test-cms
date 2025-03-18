import type { APIRoute } from 'astro';
import { CResponse } from '@classes/CResponse';
import { getParsedCollection } from '@utils/collection';

export const GET: APIRoute = async () => {
  const regions = await getParsedCollection('regions', ({ data }) => data);
  return CResponse.quickJson(regions);
};
