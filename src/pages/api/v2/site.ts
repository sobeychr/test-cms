import type { APIRoute } from 'astro';
import { CSite } from '@classes/collection/CSite';

const SORT_NAME = 'name';
const SORT_ID = 'id';

export const GET: APIRoute = async ({ url }) => {
  const sites = await CSite.getListFromCollection();

  const sort = url.searchParams?.get('sort') || '';
  if (sort === SORT_ID) {
    sites.sort(CSite.sortById);
  } else if (sort === SORT_NAME) {
    sites.sort(CSite.sortByName);
  }

  return new Response(JSON.stringify(sites));
};
