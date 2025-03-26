import type { APIRoute } from 'astro';
import { CError } from '@classes/CError';
import { CSite } from '@classes/collection/CSite';
import { CResponse } from '@classes/CResponse';
import { ERRORS } from '@utils/configs';

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

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

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

   
  const { id, countries = '', languages = '', ...restData } = data;

  const country = countries.split(',').map(entry => entry.trim()).filter(String);
  const langs = languages.split(',').map(entry => entry.trim()).filter(String);
  const newEntry = new CSite({
    ...prevEntry,
    ...restData,
    countries: country.length === 0 ? null : country,
    langs: langs.length === 0 ? null : langs,
  });

  if (!prevEntry.isDifferent(newEntry)) {
    const error = new CError(ERRORS.siteNoChange);
    throw error;
  }

  return CResponse.quickJson({
    newEntry,
  });
};

