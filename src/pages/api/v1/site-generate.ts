import type { APIRoute } from 'astro';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { CCountry } from '@classes/collection/CCountry';
import { CLanguage } from '@classes/collection/CLanguage';
import { CRegion } from '@classes/collection/CRegion';
import { CSite } from '@classes/collection/CSite';
import { CResponse } from '@classes/CResponse';
import { generateRandomArray } from '@utils/array';
import { getRandomInt } from '@utils/number';
import { randomString } from '@utils/string';

const ID_INCREMENT = 1;
const ID_START = 2;
const ID_END = 75;

const NAME_MIN = 5;
const NAME_MAX = 15;

const TIME_PERC = 0.5;
const TIME_END = 1774478884;
const TIME_START = 1711406884;

const PATH = resolve('.', 'src/collections/sites/mocks/').concat('/');

export const GET: APIRoute = async () => {
  const countryList = await CCountry.getListFromCollection();
  const langList = await CLanguage.getListFromCollection();
  const regionList = await CRegion.getListFromCollection();

  const newList = [];
  for (let i = ID_START; i <= ID_END; i += ID_INCREMENT) {
    const countries = generateRandomArray(countryList, 4, entry => entry.id);
    const langs = generateRandomArray(langList, 2, entry => entry.iso);
    const region = generateRandomArray(regionList, 2, entry => entry.name);

    const hasStart = Math.random() > TIME_PERC;
    const start = !hasStart ? null : getRandomInt(TIME_START, TIME_END);
    const hasEnd = Math.random() > TIME_PERC;
    const end = !hasEnd ? null : getRandomInt(start || TIME_START, TIME_END);

    const newSite = new CSite({
      countries: countries.length === 0 ? null : countries,
      end,
      id: i,
      langs: langs.length === 0 ? null : langs,
      name: randomString(NAME_MIN, NAME_MAX),
      region: region.length === 0 ? null : region,
      start,
    });
    newList.push(newSite);

    const path = PATH.concat(`${i}.json`);
    writeFileSync(path, JSON.stringify(newSite), { encoding: 'utf8' });
  }

  return CResponse.quickJson(newList);
};
