import { createSignal, Show } from 'solid-js';
import { InputDatalist } from '@components/form-element/InputDatalist';

type InputEditParam = {
  autofocus?: boolean;
  datalist?: string;
  id?: string;
  label: string;
  multiEntries?: boolean;
  name: string;
  remainEdit?: boolean;
  required?: boolean;
  type?: string;
  value: number | string | null;
};

export const InputEdit = (props: InputEditParam) => {
  const {
    autofocus = false,
    datalist,
    id: idProp,
    label,
    multiEntries = false,
    name,
    remainEdit = false,
    required = false,
    type = 'text',
    value: valueProp = '',
  } = props;

  const id = idProp || name;

  const [isEdit, setIsEdit] = createSignal(remainEdit);
  const [value, setValue] = createSignal(valueProp);

  const isChanged = () => value() !== valueProp;
  const hasList = !!datalist;

  const onClick = () => setIsEdit(true);

  const onChange = (event: Event) => setValue(event?.target?.value);

  const onOut = () => !remainEdit && setIsEdit(false);

  return (<p>
    <label for={id} onClick={onClick}>
      {label}
      <Show when={!isEdit()}>
        <span data-value={valueProp}>{value() || 'null'}</span>
      </Show>
      <Show when={isEdit()}>
        <Show when={hasList}>
          <InputDatalist id={id} name={name} value={value()} autofocus={autofocus} datalist={datalist} multiEntries={multiEntries} onChange={onChange} onFocusOut={onOut} required={required} />
        </Show>
        <Show when={!hasList}>
          <input type={type} name={name} id={id} value={value()} autofocus={autofocus} onChange={onChange} onFocusOut={onOut} required={required} />
        </Show>
      </Show>
      <Show when={isChanged()}>
        <input type='hidden' name={name} id={id} value={value()} />
      </Show>
    </label>
  </p>);
};
