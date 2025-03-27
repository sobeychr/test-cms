import { For } from 'solid-js';
import { CID } from '@classes/CID';
import { toCleanArray } from '@utils/string';

type InputDatalistParam = {
  classAdd?: string;
  classInput?: string;
  dataList: Array<string>;
  id?: string;
  name: string;
  onChange?: (event: Event) => void;
  onFocusOut?: (event: Event) => void;
  splitPrint?: string;
  splitValue?: string;
  value?: string;
};

export const InputDatalist = (props: InputDatalistParam) => {
  const {
    classAdd = '',
    classInput = '',
    dataList,
    id: idProp,
    name,
    onChange,
    onFocusOut,
    splitPrint = ', ',
    splitValue = ',',
    value = '',
  } = props;

  let addRef;
  let inputRef;
  const id = idProp || name || CID.shortHash();

  const onAddEntry = () => {
    if (addRef && inputRef) {
      const prevParsed = toCleanArray(inputRef.value || '', splitValue);
      const newValue = [...prevParsed, addRef.value];
      const newParsed = Array.from(new Set(newValue.sort()));
      inputRef.value = newParsed.join(splitPrint);
      addRef.value = '';

      inputRef.dispatchEvent(new Event('change'));
    }
  };

  const onOut = (event: Event) => {
    setTimeout(() => {
      const active = document?.activeElement;
      if (active !== addRef && active !== inputRef) {
        onFocusOut(event);
      }
    }, 10);
  };

  return (<>
    <input
      class={classInput}
      id={id}
      name={name}
      ref={inputRef}
      onChange={onChange}
      onFocusOut={onFocusOut && onOut}
      value={value}
      type='text'
    />
    <input
      class={classAdd}
      id={`add-${id}`}
      list={`data-${id}`}
      name={`add-${name}`}
      onChange={onAddEntry}
      onFocusOut={onFocusOut && onOut}
      ref={addRef}
      type='text'
    />
    <datalist id={`data-${id}`}>
      <For each={dataList}>
        {entry => <option value={entry} />}
      </For>
    </datalist>
  </>);
};
