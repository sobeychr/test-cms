import { listing } from '@scripts/listing';
import { hasIntersection } from '@utils/array';

const onFilter = (data, filters) => {
  const addCountry = filters.get('add-country') || '';
  if (addCountry) {
    onUpdate({
      fromInput: document.querySelector('#add-country'),
      toInput: document.querySelector('#countries'),
      field: 'countries',
      filters,
    });
  }

  const addLanguage = filters.get('add-language') || '';
  if (addLanguage) {
    onUpdate({
      fromInput: document.querySelector('#add-language'),
      toInput: document.querySelector('#languages'),
      field: 'languages',
      filters,
    });
  }

  let newData = data;

  const name = filters.get('name') || '';
  if (name) {
    newData = newData.filter(entry => entry.name.includes(name));
  }

  const region = filters.get('region') || '';
  if (region.length > 0) {
    newData = newData.filter(entry => !!entry.region && entry.region.includes(region));
  }

  const countries = (filters.getAll('countries') || []).filter(String).map(entry => entry.toUpperCase());
  if (countries.length > 0) {
    newData = newData.filter(({ countries: entryCountries }) =>
      Array.isArray(entryCountries)
      && hasIntersection(entryCountries, countries)
    );
  }

  const languages = (filters.getAll('languages') || []).filter(String).map(entry => entry.toUpperCase());
  if (languages.length > 0) {
    newData = newData.filter(({ langs: entryLangs }) =>
      Array.isArray(entryLangs)
      && hasIntersection(entryLangs, countries)
    );
  }

  // TODO: start
  // TODO: end

  return newData;
};

const onUpdate = ({
  field,
  filters,
  fromInput,
  toInput,
}) => {
  const fromValue = fromInput.value;
  const toValue = toInput.value.toString();
  const newValue = [...toValue.split(','), fromValue].filter(String);

  fromInput.value = '';
  toInput.value = newValue.join(', ');

  filters.append(field, fromValue);
};

const getShowSelector = data => {
  const showId = data.map((entry) => entry.id);
  return showId.map((entry) => `[data-id="${entry}"]`);
};

listing({
  endpoint: 'v2/site',
  getShowSelector,
  onFilter,
});
