import type { APIRoute } from 'astro';
import { getParsedCollection } from '@utils/data';
import { getApiDateParam } from '@utils/date';

export const GET: APIRoute = async ({ url }) => {
  const sites = await getParsedCollection('sites', ({ data }) => data);

  const country = (url.searchParams?.get('country') || '').toUpperCase();
  const countries = new Set(country.split(',').filter(String));
  const filterByCountries = countries.size === 0 ? sites : sites.filter(entry =>
    entry.country === null
    || new Set(entry.country).intersection(countries).size > 0
  );

  const lang = (url.searchParams?.get('lang') || '').toLowerCase();
  const langs = new Set(lang.split(',').filter(String));
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

  return new Response(JSON.stringify(filterByEnd));
};
