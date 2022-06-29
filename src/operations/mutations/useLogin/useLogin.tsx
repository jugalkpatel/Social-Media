import { SubmitHandler } from 'react-hook-form';
import { ModalsContextProps } from '@mantine/modals/lib/context';

import { LoginFormValues } from 'types';
import { useLoginMutation, LoginMutationFn } from 'operations';
import { useCommonNotifications } from 'hooks';
import { setAuthCredentials } from 'lib';

type SubmitParams = {
  submit: LoginMutationFn;
  error: (message: string) => void;
  context: ModalsContextProps;
};

function submit({ submit, error: showError, context }: SubmitParams) {
  const onSubmit: SubmitHandler<LoginFormValues> = async (
    values: LoginFormValues,
  ) => {
    try {
      const { data } = await submit({
        variables: { email: values.email, password: values.password },
      });

      if (data && data?.login && data.login.__typename === 'CommonError') {
        throw new Error(data.login.message);
      }

      if (data && data?.login && data.login.__typename === 'User') {
        const { id, name, picture, bookmarks } = data.login;

        setAuthCredentials({ isLoggedIn: !!id, id, name, picture, bookmarks });

        context.closeAll();

        //   router.push('/');
        return;
      }
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong';

      showError(errorMessage);
    }
  };

  return onSubmit;
}

function useLogin({ context }: { context: ModalsContextProps }) {
  const [mutationFn, { loading }] = useLoginMutation();
  const { error } = useCommonNotifications();

  const onSubmit = submit({ submit: mutationFn, error, context });

  return { onSubmit, loading };
}

export default useLogin;
