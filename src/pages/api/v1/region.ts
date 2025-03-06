import type { APIRoute } from 'astro';
import { getParsedCollection } from '@utils/collection';

export const GET: APIRoute = async () => {
  const regions = await getParsedCollection('regions', ({ data }) => data);
  return new Response(JSON.stringify(regions));
};
