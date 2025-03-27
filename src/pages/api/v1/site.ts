import type { APIRoute } from 'astro';
import { CResponse } from '@classes/CResponse';
import { getParsedCollection } from '@utils/collection';
import { getApiDateParam } from '@utils/date';
import { toCleanArray } from '@utils/string';

export const GET: APIRoute = async ({ url }) => {
  const sites = await getParsedCollection('sites', ({ data }) => data);

  const countries = toCleanArray((url.searchParams?.get('country') || '').toUpperCase());
  const filterByCountries = countries.size === 0 ? sites : sites.filter(entry =>
    entry.country === null
    || new Set(entry.country).intersection(countries).size > 0
  );

  const langs = toCleanArray((url.searchParams?.get('lang') || '').toLowerCase());
  const filterByLangs = langs.size === 0 ? filterByCountries : filterByCountries.filter(entry =>
    entry.lang === null
    || new Set(entry.lang).intersection(langs).size > 0
  );

  const start = getApiDateParam(url.searchParams?.get('start'));
  const filterByStart = start === 0 ? filterByLangs : filterByLangs.filter(entry =>
    entry.starttime === null
    || entry.starttime < start
  );

  const end = getApiDateParam(url.searchParams?.get('end'));
  const filterByEnd = end === 0 ? filterByStart : filterByStart.filter(entry =>
    entry.endtime === null
    || entry.endtime < start
  );

  return CResponse.quickJson(filterByEnd);
};
