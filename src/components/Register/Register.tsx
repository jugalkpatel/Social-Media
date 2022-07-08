import { useForm } from 'react-hook-form';
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
import { useModals } from '@mantine/modals';
import Rocket from '@/assets/rocket.svg';

import { RegisterFormValues } from 'types';
import { useRegister } from 'operations';

function Register({ context, id: modalId }: ContextModalProps) {
  const modals = useModals();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', password: '' },
  });
  const { onSubmit, loading } = useRegister({ context });

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

            <Button type="submit" loading={loading}>
              Register
            </Button>
          </Group>
        </form>
      </Group>
    </>
  );
}

export { Register };
