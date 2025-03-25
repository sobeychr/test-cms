import { listing } from '@scripts/listing';

const filterFunc = (data, filters) => {
  let newData = data;

  const name = filters.get('name') || '';
  if (name) {
    newData = newData.filter(entry => entry.name.includes(name));
  }

  return newData;
};

const getShowIds = data => {
  const showId = data.map((entry) => entry.id);
  const showSelector = showId.map((entry) => `[data-id="${entry}"]`);

  return {
    showId,
    showSelector,
  };
};

listing.init({ endpoint: 'v2/site', filterFunc, getShowIds });
