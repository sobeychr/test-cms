import { listing } from '@scripts/listing';

const onFilter = (data, filters) => {
  let newData = data;

  const name = filters.get('name') || '';
  if (name) {
    newData = newData.filter(entry => entry.name.includes(name));
  }

  return newData;
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
