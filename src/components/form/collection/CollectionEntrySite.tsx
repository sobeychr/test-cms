import type { CSite } from '@classes/collection/CSite';
import { InputEdit } from '@components/form-element/InputEdit';
import { API_PREFIX } from '@utils/configs';
import { printCleanArray } from '@utils/string';

type CollectionEntrySiteParam = {
  datalistCountries: string;
  datalistLanguages: string;
  datalistRegions: string;
  entry: CSite;
};

export const CollectionEntrySite = (props: CollectionEntrySiteParam) => {
  const { datalistCountries, datalistLanguages, datalistRegions, entry } = props;

  const cleanCountries = Array.isArray(entry?.countries)
    ? printCleanArray(entry?.countries.join(','))
    : null;
  const cleanLanguages = Array.isArray(entry?.langs)
    ? printCleanArray(entry?.langs.join(','))
    : null;

  return <>
    <InputEdit label="Name:" name="name" value={entry?.name} />
    <InputEdit
      datalist={datalistRegions}
      label="Region:"
      name="region"
      value={entry?.region}
    />
    <InputEdit
      datalist={datalistCountries}
      label="Countries:"
      name="countries"
      value={cleanCountries}
    />
    <InputEdit
      datalist={datalistLanguages}
      label="Languages:"
      name="languages"
      value={cleanLanguages}
    />
    <InputEdit
      label="Start:"
      name="start"
      value={entry?.start}
      type="datetime-local"
    />
    <InputEdit
      label="End:"
      name="end"
      value={entry?.end}
      type="datetime-local"
    />
  </>;
};

export const SITE_FORM_URL = `${API_PREFIX}v2/site`;

export const SITE_ON_DATA_CONVERT = (data: object) => {
  const preStart = data.start;
  const newStart = preStart && new Date(preStart);
  if (newStart) data.start = newStart.getTime() * 0.001;

  const preEnd = data.end;
  const newEnd = preEnd && new Date(preEnd);
  if (newEnd) data.end = newEnd.getTime() * 0.001;

  return data;
};

export const SITE_ON_RESET = (event: Event) => {
  const form = event?.target;
  if (form) {
    form.querySelectorAll('label input[type="hidden"]').forEach((entry) => entry.remove());
    form.querySelectorAll('label span').forEach((entry) => {
      const value = entry.getAttribute('data-value') || 'null';
      entry.textContent = value;
    });
  }
};
