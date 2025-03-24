import { API_PREFIX } from '@utils/configs';
import { populateTemplate } from '@utils/dom';
import { useRequest } from '@utils/request';

const filterForm = document.querySelector('#filters');

const callRequest = async () => {
  const resp = await useRequest({
    url: `${API_PREFIX}v2/site`,
  });

  document.querySelector('#sites-data').textContent = JSON.stringify(resp);

  populateSites(resp);
};

const getData = () => JSON.parse(document.querySelector('#sites-data')?.textContent || '{}');

const getFilteredData = () => {
  const filters = new FormData(filterForm);
  const data = getData();
  let newData = data;

  const name = filters.get('name') || '';
  if (name) {
    newData = newData.filter(entry => entry.name.includes(name));
  }

  return newData;
};

const init = () => {
  document.querySelectorAll('#title, #update').forEach((entry) => {
    entry.addEventListener('click', () => {
      document.querySelector('#sites-body').innerHTML = '';
      document.querySelector('#sites-data').innerHTML = '';
      callRequest();
    });
  });

  filterForm?.addEventListener('change', () => {
    const newData = getFilteredData();
    updateFilter(newData);
  });

  filterForm?.addEventListener('reset', () => {
    document.querySelectorAll('#sites-body .entry.hidden').forEach((entry) => {
      entry.classList.remove('hidden');
    });
  });

  callRequest();
};

const populateSites = (entries) => {
  if (entries.length === 0) {
    document.querySelector('#sites-body').textContent = 'no entries';
    return;
  };

  populateTemplate(
    document.querySelector('#entry') as HTMLTemplateElement,
    document.querySelector('#sites-body') as HTMLElement,
    entries,
  );

  document.querySelector('#stats-total').textContent = `(${entries.length})`;
};

const updateFilter = (data) => {
  const showId = data.map((entry) => entry.id);
  const showSelector = showId.map((entry) => `[data-id="${entry}"]`);
  document
    .querySelectorAll(`#sites-body .entry:where(${showSelector.join(', ')})`)
    .forEach((entry) => entry.classList.remove('hidden'));

  document
    .querySelectorAll(`#sites-body .entry:not(:where(${showSelector.join(', ')}))`)
    .forEach((entry) => entry.classList.add('hidden'));
};

init();
