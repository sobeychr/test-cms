import { CID } from '@classes/CID';
import styles from './toggleIconStyles.module.scss';

export const ToggleIcon = props => {
  const {
    defaultChecked = false,
    id: idProp,
    label,
    name,
    onChange: onChangeName,
    value,
  } = props;

  let inputElement;

  const id = idProp || name || CID.shortHash();

  const onChange = (event: Event) => {
    const afterValue = inputElement?.checked || false;
    const func = window[onChangeName];
    if (typeof func === 'function') {
      func({ after: afterValue, before: !afterValue, event });
    } else {
      console.error(`[ToggleSlide] unable to call function "window.${onChangeName}()"`);
    }
  };

  return (<div class={styles.toggleslide}>
    <label for={id}>{label}</label>
    <input
      checked={defaultChecked}
      id={id}
      name={name}
      onChange={onChangeName && onChange}
      ref={inputElement}
      type="checkbox"
      value={value}
    />
  </div>);
};
