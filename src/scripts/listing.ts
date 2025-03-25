import { API_PREFIX } from '@utils/configs';
import { dateToFullString } from '@utils/date';
import { populateTemplate } from '@utils/dom';
import { useRequest } from '@utils/request';
import { byteToSizeString } from '@utils/string';

interface listingParams {
  endpoint: string;
  getShowSelector: (data: Array<object>) => string;
  onPostCallRequest?: (data: Array<object>) => void;
  onPreCallRequest?: () => void;
  onFilter: (data: Array<object>, filters: FormData) => Array<object>;
  onPopulateContent?: (data: Array<object>) => void;
};

export const listing = (params: listingParams) => {
  const {
    endpoint,
    getShowSelector,
    onFilter,
    onPopulateContent,
    onPostCallRequest,
    onPreCallRequest,
  } = params;
  const filterForm = document.querySelector('#filters');

  const callRequest = async () => {
    const resp = await useRequest({
      url: API_PREFIX.concat(endpoint),
    });

    document.querySelector('#content-data').textContent = JSON.stringify(resp);

    populateContent(resp);
    if (typeof onPostCallRequest === 'function') {
      onPostCallRequest(resp);
    }
  };

  const getData = () => JSON.parse(document.querySelector('#content-data')?.textContent || '{}');

  const getFilteredData = () => {
    const filters = new FormData(filterForm);
    const data = getData();
    const newData = typeof onFilter === 'function' && onFilter(data, filters) || data;
    return newData;
  };

  const init = () => {
    document.querySelectorAll('#title, #update').forEach((entry) => {
      entry.addEventListener('click', () => {
        document.querySelector('#content-body').innerHTML = '';
        document.querySelector('#content-data').innerHTML = '';
        if (typeof onPreCallRequest === 'function') {
          onPreCallRequest();
        }
        callRequest();
      });
    });

    filterForm?.addEventListener('change', () => {
      const newData = getFilteredData();
      updateFilter(newData);
      if (typeof onPostCallRequest === 'function') {
        onPostCallRequest(newData);
      }
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

    document.querySelectorAll('#content-body span[data-date]').forEach((entry) => {
      const date = new Date(entry.getAttribute('data-date') || '');
      entry.textContent = dateToFullString(date);
    });

    document.querySelectorAll('#content-body span[data-size]').forEach((entry) => {
      const size = parseInt(entry.getAttribute('data-size'), 10) || 0;
      entry.textContent = byteToSizeString(size);
    });

    if (typeof onPopulateContent === 'function') {
      onPopulateContent(entries);
    }
  };

  const updateFilter = (data) => {
    const showSelector = getShowSelector(data);

    document
      .querySelectorAll(`#content-body .entry:where(${showSelector.join(', ')})`)
      .forEach((entry) => entry.classList.remove('hidden'));

    document
      .querySelectorAll(`#content-body .entry:not(:where(${showSelector.join(', ')}))`)
      .forEach((entry) => entry.classList.add('hidden'));

    document.querySelector('#stats-total').textContent = `(${data.length})`;
  };

  init();
};
