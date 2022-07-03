import { useForm, Controller } from 'react-hook-form';
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
  Stack,
} from '@mantine/core';
import WavingHand from '@/assets/waving_hand.svg';

import { LoginFormValues } from 'types';
import { useLogin } from 'operations';

function Login({ context, id: modalId }: ContextModalProps) {
  // const router = useRouter();
  const modals = useModals();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    control,
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });
  const { onSubmit, loading } = useLogin({ context });

  const switchModal = () => {
    context.closeModal(modalId);
    modals.openContextModal('REGISTER', { innerProps: {} });
  };

  const autofill = () => {
    setValue('email', 'guest@gmail.com', { shouldValidate: true });

    setValue('password', 'guest12345', { shouldValidate: true });

    handleSubmit(onSubmit)();
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

            <Stack spacing="xs">
              <Button type="submit" loading={loading}>
                Login
              </Button>

              {!loading ? (
                <Button variant="subtle" onClick={autofill}>
                  Login as Guest
                </Button>
              ) : null}
            </Stack>
          </Group>
        </form>
      </Group>
    </>
  );
}

export { Login };
