import type { APIRoute } from 'astro';
import { CSite } from '@classes/collection/CSite';

export const GET: APIRoute = async () => {
  const sites = await CSite.getListFromCollection();

  return new Response(JSON.stringify(sites));
};
