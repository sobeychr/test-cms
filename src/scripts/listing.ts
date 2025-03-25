import { API_PREFIX } from '@utils/configs';
import { populateTemplate } from '@utils/dom';
import { useRequest } from '@utils/request';

export const listing = (function () {
  const configs = { endpoint: null, filterFunc: null, getShowIds: null };
  const filterForm = document.querySelector('#filters');

  const callRequest = async () => {
    const resp = await useRequest({
      url: API_PREFIX.concat(configs.endpoint),
    });

    document.querySelector('#content-data').textContent = JSON.stringify(resp);

    populateContent(resp);
  };

  const getData = () => JSON.parse(document.querySelector('#content-data')?.textContent || '{}');

  const getFilteredData = () => {
    const filters = new FormData(filterForm);
    const data = getData();
    const filterFunc = configs.filterFunc;
    const newData = typeof filterFunc === 'function' && filterFunc(data, filters) || data;
    return newData;
  };

  const init = props => {
    configs.endpoint = props.endpoint;
    configs.filterFunc = props.filterFunc;
    configs.getShowIds = props.getShowIds;

    document.querySelectorAll('#title, #update').forEach((entry) => {
      entry.addEventListener('click', () => {
        document.querySelector('#content-body').innerHTML = '';
        document.querySelector('#content-data').innerHTML = '';
        callRequest();
      });
    });

    filterForm?.addEventListener('change', () => {
      const newData = getFilteredData();
      updateFilter(newData);
    });

    filterForm?.addEventListener('reset', () => {
      document.querySelectorAll('#content-body .entry.hidden').forEach((entry) => {
        entry.classList.remove('hidden');
      });
    });

    callRequest();
  };

  const populateContent = (entries) => {
    if (entries.length === 0) {
      document.querySelector('#content-body').textContent = 'no entries';
      return;
    };

    populateTemplate(
      document.querySelector('#entry') as HTMLTemplateElement,
      document.querySelector('#content-body') as HTMLElement,
      entries,
    );

    document.querySelector('#stats-total').textContent = `(${entries.length})`;
  };

  const updateFilter = (data) => {
    const { showSelector } = configs.getShowIds(data);

    document
      .querySelectorAll(`#content-body .entry:where(${showSelector.join(', ')})`)
      .forEach((entry) => entry.classList.remove('hidden'));

    document
      .querySelectorAll(`#content-body .entry:not(:where(${showSelector.join(', ')}))`)
      .forEach((entry) => entry.classList.add('hidden'));
  };

  return {
    init,
  };
})();
