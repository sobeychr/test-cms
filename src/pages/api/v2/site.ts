import type { APIRoute } from 'astro';
import { CError } from '@classes/CError';
import { CSite } from '@classes/collection/CSite';
import { CResponse } from '@classes/CResponse';
import { ERRORS } from '@utils/errors';
import { toCleanArray } from '@utils/string';

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

  return CResponse.quickJson(sites);
};

export const PATCH: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => ({})) || {};

  const id = parseInt(data.id, 10);
  if (!id) {
    const error = new CError(ERRORS.siteId);
    throw error;
  }

  const prevEntry = await CSite.getEntryFromCollection(id);
  if (!prevEntry) {
    const error = new CError(ERRORS.siteInvalid);
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, countries, languages, ...restData } = data;
  const country = countries && toCleanArray(countries);
  const langs = languages && toCleanArray(languages);

  const newData = { ...restData };
  if (country) newData.countries = country.length === 0 ? null : country;
  if (langs) newData.languages = langs.length === 0 ? null : langs;

  if (Object.keys(newData).length === 0) {
    const error = new CError(ERRORS.siteNoChange);
    throw error;
  }

  const newEntry = new CSite({
    ...prevEntry,
    ...newData
  });

  newEntry.writeFile();

  return CResponse.quickJson({
    actions: [{
      command: 'reload',
    }],
    data: newEntry,
    success: true,
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => ({})) || {};

  const { name, region, countries, languages, start, end } = data;

  if (!name) {
    const error = new CError(ERRORS.siteNoName);
    throw error;
  }

  const list = await CSite.getListFromCollection();
  const sorted = list.sort(CSite.sortById);

  const prevName = sorted.find(entry => entry.name === name);
  if (prevName) {
    const error = new CError(ERRORS.sitePreexistName);
    throw error;
  }

  const lastEntry = sorted[sorted.length - 1];
  const id = lastEntry.id += 1;
  const country = countries && toCleanArray(countries);
  const langs = languages && toCleanArray(languages);

  const newEntry = new CSite({
    countries: country,
    end,
    id,
    langs,
    name,
    region,
    slug: id,
    start,
  });

  newEntry.writeFile();

  return CResponse.quickJson({
    actions: [{
      command: 'reload',
    }],
    data: newEntry,
    success: true,
  });
};
