import { CID } from '@classes/CID';
import { createSignal } from 'solid-js';
import { iteratorToObj } from '@utils/object';
import { useRequest } from '@utils/request';
import styles from './styles.module.scss';

type FormParam = {
  action: string;
  children: HTMLElement;
  class?: string;
  defaultRequest?: boolean;
  id?: string;
  loadingClass?: string;
  method?: 'GET' | 'PATCH' | 'POST' | 'PUT';
  onDataConvertName?: string;
  onResetName?: string;
};

type ActionResponse = {
  command: 'redirect' | 'reload';
  param: number | object | string;
};

type DefaultRequestResponse = {
  actions: Array<ActionResponse>;
  success: boolean;
};

export const Form = (props: FormParam) => {
  const {
    action,
    children,
    class: classStr = '',
    defaultRequest = true,
    id = `form-${CID.shortHash()}`,
    loadingClass = 'loading',
    method = 'POST',
    onDataConvertName,
    onResetName,
    ...rest
  } = props;

  const [isLoading, setIsLoading] = createSignal(false);

  const classList = () => ({
    [classStr]: true,
    [styles.loading]: isLoading(),
    [loadingClass]: isLoading(),
  });

  const onReset = (event: Event) => {
    const func = window?.[onResetName];
    if (typeof func === 'function') {
      func(event);
    }
    else {
      console.log('[Form.tsx] error in onReset()', `window.${onResetName}() does not exist`);
    }
  };

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event?.target);
    const postData = iteratorToObj(formData);
    const convertFunc = window?.[onDataConvertName];

    const result = defaultRequest && await useRequest({
      postData: typeof convertFunc === 'function' ? convertFunc(postData) : postData,
      method,
      url: action,
    }) as DefaultRequestResponse;

    setIsLoading(false);
    const { actions, success = false } = result || {};

    if (!success) {
      console.log(`[Form.tsx] error in result`, result);
    } else {
      actions.forEach(({ command, param }) => {
        if (command === 'redirect') {
          window.location = param;
        } else if (command === 'reload') {
          window.location.reload();
        }
      });
    }
  };

  return <form action={action} classList={classList()} id={id} method={method} {...rest} onReset={onResetName && onReset} onSubmit={onSubmit}>
    {children}
  </form>;
};
