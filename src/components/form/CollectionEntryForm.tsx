import { Show } from 'solid-js';
import type { CCountry } from '@classes/collection/CCountry';
import type { CLanguage } from '@classes/collection/CLanguage';
import type { CRegion } from '@classes/collection/CRegion';
import type { CSite } from '@classes/collection/CSite';
import { CollectionEntrySite, SITE_FORM_URL, SITE_ON_DATA_CONVERT, SITE_ON_RESET } from '@components/form/collection/CollectionEntrySite';
import { Form } from '@components/form/Form';

type CollectionEntryFormParam = {
  class?: string;
  contentProps?: object;
  entry?: CCountry | CLanguage | CRegion | CSite;
  preset: 'country' | 'language' | 'region' | 'site';
};

const PRESETS = {
  site: {
    Contents: CollectionEntrySite,
    formUrl: SITE_FORM_URL,
    onDataConvert: SITE_ON_DATA_CONVERT,
    onReset: SITE_ON_RESET,
  }
};

export const CollectionEntryForm = (props: CollectionEntryFormParam) => {
  const { class: classStr = '', contentProps = {}, entry, preset } = props;
  const hasId = !!entry?.id;

  const { Contents, formUrl, onDataConvert, onReset } = PRESETS[preset] || {};
  const formId = `${hasId ? 'edit' : 'send'}-site`;
  const method = hasId ? 'PATCH' : 'PUT';

  return (<Form action={formUrl} class={classStr} defaultRequest id={formId} method={method} onDataConvert={onDataConvert} onReset={onReset}>
    <Show when={hasId}>
      <input type='hidden' name='id' value={entry.id} />
    </Show>

    {!!Contents && <Contents entry={entry} {...contentProps} />}

    <p>
      <button type="reset">Reset</button>
      <button type="submit">Send</button>
    </p>
  </Form>);
};
