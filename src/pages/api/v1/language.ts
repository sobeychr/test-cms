import type { APIRoute } from 'astro';
import { CResponse } from '@classes/CResponse';
import { getParsedCollection } from '@utils/collection';

export const GET: APIRoute = async () => {
  const languages = await getParsedCollection('languages', ({ data }) => data);
  return CResponse.quickJson(languages);
};
