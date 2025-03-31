import { createSignal, Show } from 'solid-js';
import { InputDatalist } from '@components/form-element/InputDatalist';

type InputEditParam = {
  datalist?: string;
  id?: string;
  label: string;
  multiEntries?: boolean;
  name: string;
  type?: string;
  value: number | string | null;
};

export const InputEdit = (props: InputEditParam) => {
  const {
    datalist,
    id: idProp,
    label,
    multiEntries = false,
    name,
    type = 'text',
    value: valueProp,
  } = props;

  const id = idProp || name;

  const [isEdit, setIsEdit] = createSignal(false);
  const [value, setValue] = createSignal(valueProp);

  const isChanged = () => value() !== valueProp;
  const hasList = !!datalist;

  const onClick = () => setIsEdit(true);

  const onChange = (event: Event) => setValue(event?.target?.value);

  const onOut = () => setIsEdit(false);

  return (<p>
    <label for={id} onClick={onClick}>
      {label}
      <Show when={!isEdit()}>
        <span data-value={valueProp}>{value() || 'null'}</span>
      </Show>
      <Show when={isEdit()}>
        <Show when={hasList}>
          <InputDatalist id={id} name={name} value={value()} datalist={datalist} multiEntries={multiEntries} onChange={onChange} onFocusOut={onOut} />
        </Show>
        <Show when={!hasList}>
          <input type={type} name={name} id={id} value={value()} onChange={onChange} onFocusOut={onOut} />
        </Show>
      </Show>
      <Show when={isChanged()}>
        <input type='hidden' name={name} id={id} value={value()} />
      </Show>
    </label>
  </p>);
};
