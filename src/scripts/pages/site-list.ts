import { listing } from '@scripts/listing';
import { hasIntersection } from '@utils/array';
import { isValid } from '@utils/date';

const onFilter = (data, filters) => {
  const addCountry = filters.get('add-country') || '';
  if (addCountry) {
    onUpdate({
      field: 'countries',
      filters,
      fromInput: document.querySelector('#add-country'),
      toInput: document.querySelector('#countries'),
    });
  }

  const addLanguage = filters.get('add-language') || '';
  if (addLanguage) {
    onUpdate({
      field: 'languages',
      filters,
      fromInput: document.querySelector('#add-language'),
      toInput: document.querySelector('#languages'),
    });
  }

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

  const countries = (filters.get('countries') || '').split(',').map(entry => entry.trim().toUpperCase()).filter(String);
  if (countries.length > 0) {
    newData = newData.filter(({ countries: entryCountries }) =>
      Array.isArray(entryCountries)
      && hasIntersection(entryCountries, countries)
    );
  }

  const languages = (filters.get('languages') || '').split(',').map(entry => entry.trim().toLowerCase()).filter(String);
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

type onUpdateParam = {
  field: string;
  filters: FormData;
  fromInput: HTMLInputElement;
  toInput: HTMLInputElement;
};
const onUpdate = ({
  field,
  filters,
  fromInput,
  toInput,
}: onUpdateParam): void => {
  const fromValue = fromInput.value;
  const toValue = toInput.value.toString();
  const newValue = [...toValue.split(','), fromValue].filter(String);

  fromInput.value = '';
  toInput.value = newValue.join(', ');

  filters.set(field, newValue.join(', '));
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
