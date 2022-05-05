import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ContextModalProps, useModals } from '@mantine/modals';

import {
  Group,
  InputWrapper,
  Input,
  PasswordInput,
  Text,
  Button,
  Anchor,
  Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IoMdClose } from 'react-icons/io';
import WavingHand from '@/assets/waving_hand.svg';

import { useLoginMutation } from './__generated__/login.generated';
import { setAuthCredentials, setAuthCredentialsInLocalStorage } from 'lib';

type FormValues = {
  email: string;
  password: string;
};

function toast(msg: string) {
  showNotification({
    message: msg,
    autoClose: 3000,
    icon: <IoMdClose />,
    color: 'red',
  });
}

function Login({ context, id: modalId }: ContextModalProps) {
  const router = useRouter();
  const modals = useModals();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const [loginUser, { loading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    let message = 'something went wrong!';

    loginUser({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        const { data } = response;

        console.log({ data });

        if (data?.login && data.login.__typename === 'AuthPayload') {
          const {
            token,
            user: { id, name },
          } = data.login;

          const isSavedInLocalStorage = setAuthCredentialsInLocalStorage({
            token,
            id,
            name,
          });

          if (!isSavedInLocalStorage) {
            toast('unable to save item in localstorage');
            return;
          }

          setAuthCredentials({
            isLoggedIn: true,
            id,
            name,
            token,
          });

          context.closeModal(modalId);

          router.push('/');

          return;
        }

        if (data?.login && data.login.__typename === 'AuthError') {
          message = data.login.message;
        }

        toast(message);
      })
      .catch((err) => {
        console.log({ err });
        // for unknown errors
        toast(message);
      });
  };

  const switchModal = () => {
    context.closeModal(modalId);
    modals.openContextModal('REGISTER', { innerProps: {} });
  };

  return (
    <>
      <Group direction="column" spacing="md" position="center" grow>
        <Group direction="column">
          <WavingHand />

          <Title order={2}>Welcome Back!</Title>

          <Group direction="row" spacing={5}>
            <Text color="dimmmed">New to Rices?</Text>
            <Text
              color="orange"
              weight="700"
              onClick={switchModal}
              sx={() => ({ cursor: 'pointer' })}
            >
              Register
            </Text>
          </Group>
        </Group>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Group direction="column" spacing="xl" grow>
            <InputWrapper
              id="email-input"
              label="Email"
              error={errors.email ? errors.email.message : null}
            >
              <Input
                id="email-input"
                placeholder="Type your email"
                {...register('email', {
                  required: 'Email is required',
                })}
              />
            </InputWrapper>

            <div>
              <Group position="apart" mb={5}>
                <Text
                  component="label"
                  htmlFor="password-input"
                  size="sm"
                  weight={500}
                >
                  Password
                </Text>

                <Anchor<'a'>
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  sx={(theme) => ({
                    paddingTop: 2,
                    color:
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === 'dark' ? 4 : 6
                      ],
                    fontWeight: 500,
                    fontSize: theme.fontSizes.xs,
                  })}
                >
                  Forgot your password?
                </Anchor>
              </Group>

              <PasswordInput
                placeholder="Your password"
                id="password-input"
                error={errors.password ? errors.password.message : null}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'minimum length should be 8 characters',
                  },
                  maxLength: {
                    value: 15,
                    message: 'maximum length should be 15 characters',
                  },
                })}
              />
            </div>

            <Button type="submit" loading={isSubmitting}>
              Login
            </Button>
          </Group>
        </form>
      </Group>
    </>
  );
}

export { Login };
