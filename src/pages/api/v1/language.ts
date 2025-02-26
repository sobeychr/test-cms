import type { APIRoute } from 'astro';
import { getParsedCollection } from '@utils/data';

export const GET: APIRoute = async () => {
  const languages = await getParsedCollection('languages', ({ data }) => data);
  return new Response(JSON.stringify(languages));
};
