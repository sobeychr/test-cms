import { API_PREFIX } from '@utils/configs';
import { dateToFullString, dateToTimeString } from '@utils/date';
import { populateTemplate } from '@utils/dom';
import { KB } from '@utils/number';
import { incrementObject, totalFromObjectValues } from '@utils/object';
import { useRequest } from '@utils/request';
import { byteToSizeString, maxLength } from '@utils/string';

const DELAY_LOW = 300;
const DELAY_MEDIUM = 700;
const DELAY_HIGH = 1200;

const MAX_LABEL = 10;

const filterForm = document.querySelector('#filters');

const callRequest = async () => {
  const resp = await useRequest({
    url: `${API_PREFIX}v2/logs`,
  });

  document.querySelector('#logs-data').textContent = JSON.stringify(resp);

  populateLogs(resp);
  updateStats(resp);
};

const formatCircle = (stats, parentElement) => {
  const total = totalFromObjectValues(stats);
  const backgrounds = [];
  const entries = [];
  let prevPercent = 0;

  Object.keys(stats).forEach((key, index) => {
    const value = stats[key];
    const percent = ((value / total) * 100).toFixed(2);

    backgrounds.push(`var(--bg-color-${index}) ${prevPercent}%`);
    prevPercent += parseFloat(percent);
    backgrounds.push(`var(--bg-color-${index}) ${prevPercent}%`);

    const label = maxLength(key, MAX_LABEL);
    entries.push(
      `<p class="color-${index}" title="${key}">${value} "${label}", ${percent}%</p>`,
    );
  });

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('beforeend', entries.join(''));
  parentElement.style.setProperty('--conic-background', backgrounds.join(','));
};

const getData = () => JSON.parse(document.querySelector('#logs-data')?.textContent || '{}');

const getFilteredData = () => {
  const filters = new FormData(filterForm);
  const data = getData();
  let newData = data;

  const methods = filters.getAll('method') || [];
  if (methods.length > 0) {
    newData = newData.filter((entry) => methods.includes(entry.method));
  }

  const delayMin = parseInt(filters.get('delay-min'), 10) || 0;
  if (delayMin > 0) {
    newData = newData.filter((entry) => entry.delay >= delayMin);
  }
  const delayMax = parseInt(filters.get('delay-max'), 10) || 0;
  if (delayMax > 0) {
    newData = newData.filter((entry) => entry.delay <= delayMax);
  }

  const path = filters.get('path') || '';
  if (path.length > 0) {
    newData = newData.filter((entry) => entry.pathname.includes(path));
  }

  const responseMin = (parseFloat(filters.get('response-min'), 10) || 0) * KB;
  if (responseMin > 0) {
    newData = newData.filter((entry) => entry.response?.size >= responseMin);
  }
  const responseMax = (parseFloat(filters.get('response-max'), 10) || 0) * KB;
  if (responseMax > 0) {
    newData = newData.filter((entry) => entry.response?.size <= responseMax);
  }

  const formats = filters.getAll('format') || [];
  if (formats.length > 0) {
    newData = newData.filter((entry) => formats.includes(entry.response?.format));
  }

  return newData;
};

const init = () => {
  document.querySelectorAll('#title, #update').forEach((entry) => {
    entry.addEventListener('click', () => {
      document.querySelector('#logs-body').innerHTML = '';
      document.querySelector('#logs-data').innerHTML = '';

      document.querySelector('#stats-delay').removeAttribute('style');
      document.querySelector('#stats-method').removeAttribute('style');
      document.querySelector('#stats-format').removeAttribute('style');
      document.querySelectorAll('#stats p').forEach((entry) => (entry.textContent = ''));

      callRequest();
    });
  });

  filterForm?.addEventListener('change', () => {
    const newData = getFilteredData();
    updateFilter(newData);
    updateStats(newData);
  });

  filterForm?.addEventListener('reset', () => {
    document.querySelectorAll('#logs-body .entry.hidden').forEach((entry) => {
      entry.classList.remove('hidden');
    });
  });

  callRequest();
};

const populateLogs = (logs) => {
  if (logs.length === 0) {
    document.querySelector('#logs-body').textContent = 'no entries';
    return;
  }

  populateTemplate(
    document.querySelector('#entry') as HTMLTemplateElement,
    document.querySelector('#logs-body') as HTMLElement,
    logs,
  );

  document.querySelectorAll('#logs-body span[data-date]').forEach((entry) => {
    const date = new Date(entry.getAttribute('data-date') || '');
    entry.textContent = dateToFullString(date);
  });

  document.querySelectorAll('#logs-body span[data-size]').forEach((entry) => {
    const size = parseInt(entry.getAttribute('data-size'), 10) || 0;
    entry.textContent = byteToSizeString(size);
  });

  document.querySelectorAll('#logs-body span[data-time]').forEach((entry) => {
    const time = parseInt(entry.getAttribute('data-time'), 10) || 0;
    const className =
      (time < DELAY_LOW && 'low') ||
      (time > DELAY_HIGH && 'high') ||
      (time > DELAY_MEDIUM && 'medium') ||
      'normal';

    entry.classList.add(className);
  });
};

const updateFilter = (data) => {
  const showUuid = data.map((entry) => entry.uuid);
  const showSelector = showUuid.map((entry) => `[data-uuid="${entry}"]`);
  document
    .querySelectorAll(`#logs-body .entry:where(${showSelector.join(', ')})`)
    .forEach((entry) => entry.classList.remove('hidden'));

  document
    .querySelectorAll(`#logs-body .entry:not(:where(${showSelector.join(', ')}))`)
    .forEach((entry) => entry.classList.add('hidden'));
};

const updateStats = (data) => {
  const stats = {
    delays: {},
    errors: {},
    formats: {},
    methods: {},
    statuses: {},
  };

  data.forEach((entry) => {
    const delay = entry.delay;
    if (delay < DELAY_LOW) incrementObject(stats.delays, 'low');
    else if (delay > DELAY_HIGH) incrementObject(stats.delays, 'high');
    else if (delay > DELAY_MEDIUM) incrementObject(stats.delays, 'medium');
    else incrementObject(stats.delays, 'normal');

    const errorName = entry.error?.name;
    if (errorName) {
      incrementObject(stats.errors, errorName);
    }

    incrementObject(stats.formats, entry.response?.format);
    incrementObject(stats.statuses, entry.response?.status);
    incrementObject(stats.methods, entry.method);
  });

  const date = new Date();
  const totalErrors = totalFromObjectValues(stats.errors);
  const total = data.length;
  document.querySelector('#stats-number .time').textContent =
    `last request: ${dateToTimeString(date)}`;
  document.querySelector('#stats-number .error').innerHTML = `${totalErrors} errors`;
  document.querySelector('#stats-number .total').innerHTML = `${total} total entries`;

  formatCircle(stats.delays, document.querySelector('#stats-delay'));
  formatCircle(stats.errors, document.querySelector('#stats-error'));
  formatCircle(stats.methods, document.querySelector('#stats-method'));
  formatCircle(stats.formats, document.querySelector('#stats-format'));
  formatCircle(stats.statuses, document.querySelector('#stats-status'));
};

init();
