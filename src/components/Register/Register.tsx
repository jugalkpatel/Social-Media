import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ContextModalProps } from '@mantine/modals';

import {
  Button,
  Group,
  Title,
  Text,
  InputWrapper,
  Input,
  Anchor,
  PasswordInput,
  Box,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useModals } from '@mantine/modals';
import { IoMdClose } from 'react-icons/io';
import Rocket from '@/assets/rocket.svg';

import { useRegisterMutation } from './__generated__/register.generated';
import { setAuthCredentials, setAuthCredentialsInLocalStorage } from 'lib';

type FormValues = {
  name: string;
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

function Register({ context, id: modalId }: ContextModalProps) {
  const router = useRouter();
  const modals = useModals();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', password: '' },
  });

  const [registerUser, { loading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    let message = 'something went wrong!';

    registerUser({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        const { data } = response;

        if (data?.register && data.register.__typename === 'AuthPayload') {
          const {
            token,
            user: { id, name },
          } = data.register;

          console.log({ token, id, name });

          const isSavedInLocalStorage = setAuthCredentialsInLocalStorage({
            id,
            name,
            token,
          });

          if (!isSavedInLocalStorage) {
            message = 'failed to save auth-credentials in local storage';
            throw new Error();
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

        if (data?.register && data.register.__typename === 'AuthError') {
          message = data.register.message;
        }

        toast(message);
      })
      .catch((error) => {
        // unhandled errors
        toast(message);
      });
  };

  const switchModal = () => {
    context.closeModal(modalId);
    modals.openContextModal('LOGIN', { innerProps: {} });
  };

  return (
    <>
      <Group direction="column" spacing="md" grow>
        <Group direction="column">
          <Box sx={() => ({ height: '3rem', width: '3rem' })}>
            <Rocket />
          </Box>

          <Title order={2}>Get Started</Title>

          <Group direction="row" spacing={5}>
            <Text color="dimmmed">Already have an account?</Text>
            <Text
              color="orange"
              weight="700"
              onClick={switchModal}
              sx={() => ({
                cursor: 'pointer',
              })}
            >
              Login
            </Text>
          </Group>
        </Group>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Group direction="column" spacing="xl" grow>
            <InputWrapper
              id="name-input"
              label="Name"
              error={errors.name ? errors.name.message : null}
            >
              <Input
                id="name-input"
                placeholder="Type your name"
                {...register('name', {
                  required: 'Name is required',
                })}
              />
            </InputWrapper>

            {/*TODO: validate Email */}
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

                {/* TODO: Implement forget password */}
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
                placeholder="Type your password"
                id="password-inpput"
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
              Register
            </Button>
          </Group>
        </form>
      </Group>
    </>
  );
}

export { Register };
