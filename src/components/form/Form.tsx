import { v4 as uuid } from 'uuid';
import { createSignal } from 'solid-js';
import { iteratorToObj } from '@utils/data';
import { useRequest } from '@utils/request';
import styles from './styles.module.scss';

type FormParam = {
  action: string;
  children: HTMLElement;
  class: string;
  defaultRequest?: boolean;
  id?: string;
  loadingClass?: string;
  method?: 'get' | 'post';
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
    id = `form-${uuid()}`,
    loadingClass = 'loading',
    method = 'post',
    ...rest
  } = props;

  const [isLoading, setIsLoading] = createSignal(false);

  const classList = () => ({
    [classStr]: true,
    [styles.loading]: isLoading(),
    [loadingClass]: isLoading(),
  });

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event?.target);
    const postData = iteratorToObj(formData);

    const result = defaultRequest && await useRequest({
      postData,
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

  return <form action={action} classList={classList()} id={id} method={method} {...rest} onSubmit={onSubmit}>
    {children}
  </form>;
};
