import { SubmitHandler } from 'react-hook-form';
import { ModalsContextProps } from '@mantine/modals/lib/context';
import Router from 'next/router';

import { RegisterFormValues } from 'types';
import { useRegisterMutation, RegisterMutationFn } from 'operations';
import { useCommonNotifications } from 'hooks';
import { setAuthCredentials, getCurrentPath } from 'lib';

type RegisterParams = {
  submit: RegisterMutationFn;
  error: (message: string) => void;
  context: ModalsContextProps;
};

function register({ submit, error: showError, context }: RegisterParams) {
  const onRegister: SubmitHandler<RegisterFormValues> = async (
    values: RegisterFormValues,
  ) => {
    try {
      const { data } = await submit({
        variables: {
          email: values.email,
          name: values.name,
          password: values.password,
        },
      });

      if (
        data &&
        data?.register &&
        data.register.__typename === 'CommonError'
      ) {
        throw new Error(data.register.message);
      }

      if (data && data?.register && data.register.__typename === 'User') {
        const { id, name, picture, bookmarks, joinedCommunities } =
          data.register;
        const currentPath = getCurrentPath();

        setAuthCredentials({
          isLoggedIn: !!id,
          id,
          name,
          picture,
          bookmarks,
          joinedCommunities,
        });

        context.closeAll();

        Router.push(`${currentPath ? currentPath : '/popular'}`);

        return;
      }
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong!';

      showError(errorMessage);

      Router.push('/popular');
    }
  };

  return onRegister;
}

function useRegister({ context }: { context: ModalsContextProps }) {
  const [mutationFn, { loading }] = useRegisterMutation();
  const { error } = useCommonNotifications();

  const onSubmit = register({ submit: mutationFn, error, context });

  return { onSubmit, loading };
}

export default useRegister;
