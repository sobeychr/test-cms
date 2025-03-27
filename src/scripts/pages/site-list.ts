import { listing } from '@scripts/listing';
import { hasIntersection } from '@utils/array';
import { isValid } from '@utils/date';
import { toCleanArray } from '@utils/string';

const onFilter = (data, filters) => {
  let newData = data;

  const name = (filters.get('name') || '').toLowerCase();
  if (name) {
    newData = newData.filter(entry => entry.name.toLowerCase().includes(name));
  }

  const regionName = filters.get('region') || '';
  const regionOption = document.querySelector(`#data-region option[data-name="${regionName}"]`);
  const regionId = regionOption?.getAttribute('data-id');
  if (regionId) {
    newData = newData.filter(entry => !!entry.region && entry.region.includes(regionId));
  }

  const countries = toCleanArray((filters.get('countries') || '').toUpperCase());
  if (countries.length > 0) {
    newData = newData.filter(({ countries: entryCountries }) =>
      Array.isArray(entryCountries)
      && hasIntersection(entryCountries, countries)
    );
  }

  const languages = toCleanArray((filters.get('languages') || '').toLowerCase());
  if (languages.length > 0) {
    newData = newData.filter(({ langs: entryLangs }) =>
      Array.isArray(entryLangs)
      && hasIntersection(entryLangs, languages)
    );
  }

  const start = filters.get('start') || '';
  if (start) {
    const startDate = new Date(start);
    if (isValid(startDate)) {
      newData = newData.filter(entry => !!entry.start && entry.start >= startDate.getTime() * .001);
    }
  }

  const end = filters.get('end') || '';
  if (end) {
    const endDate = new Date(end);
    if (isValid(endDate)) {
      newData = newData.filter(entry => !!entry.end && entry.end <= endDate.getTime() * .001);
    }
  }

  return newData;
};

const getShowSelector = (data: Array<object>): Array<string> => {
  const showId = data.map((entry) => entry.id);
  return showId.map((entry) => `[data-id="${entry}"]`);
};

listing({
  endpoint: 'v2/site?sort=id',
  getShowSelector,
  onFilter,
});
