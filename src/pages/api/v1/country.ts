import type { APIRoute } from 'astro';
import { CResponse } from '@classes/CResponse';
import { getParsedCollection } from '@utils/collection';

const FIELDS = ['cca2', 'cca3', 'id', 'name', 'region'];

const SORT_FUNC = fieldName => (a, b) => (a[fieldName] || '').localeCompare(b[fieldName] || '');

export const GET: APIRoute = async ({ url }) => {
  const countries = await getParsedCollection('countries', ({ data }) => data);
  const regions = await getParsedCollection('regions', ({ data }) => data.name.toLowerCase());

  const region = (url.searchParams?.get('region') || '').toLowerCase();
  const filtered = !regions.includes(region) ? countries : countries.filter(entry => entry.region.toLowerCase() === region);

  const search = (url.searchParams?.get('search') || '').toLowerCase();
  const searched = !search ? filtered : filtered.filter(({ name }) => name.toLowerCase().includes(search));

  const sort = url.searchParams?.get('sort');
  if (FIELDS.includes(sort)) {
    searched.sort(SORT_FUNC(sort));
  }

  const limit = parseInt(url.searchParams?.get('limit') || 0, 0);
  const limitList = limit === 0 ? searched : searched.slice(0, limit);

  return CResponse.quickJson(limitList);
};
