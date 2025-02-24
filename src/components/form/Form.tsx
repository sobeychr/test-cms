import { v4 as uuid } from 'uuid';
import { createSignal } from 'solid-js';
import { deleteCookie } from '@utils/cookie';
import { formDataToObj } from '@utils/data';
import { useRequest } from '@utils/request';
import styles from './styles.module.scss';

export const Form = props => {
  const {
    action,
    children,
    class: classStr = '',
    defaultRequest = true,
    id = `form-${uuid()}`,
    method = 'post',
    ...rest
  } = props;

  const [isLoading, setIsLoading] = createSignal(false);

  const classList = () => ({
    [classStr]: true,
    [styles.loading]: isLoading(),
  });

  const onSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event?.target);
    const postData = formDataToObj(formData);

    const result = defaultRequest && await useRequest({
      postData,
      method,
      url: action,
    });

    setIsLoading(false);
    const { actions, success = false } = result || {};

    if (!success) {
      console.log(`[Form.tsx] error in result`, result);
    } else {
      actions.forEach(({ command, param }) => {
        if (command === 'deleteCookie') {
          deleteCookie(param);
        } else if (command === 'redirect') {
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
