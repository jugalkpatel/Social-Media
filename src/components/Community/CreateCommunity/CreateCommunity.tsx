import { ContextModalProps } from '@mantine/modals';
import {
  Divider,
  TextInput,
  Button,
  Group,
  Textarea,
  Text,
  Stack,
  InputWrapper,
  Input,
} from '@mantine/core';

import { useCreateCommunity } from 'operations';
import { SubmitHandler, useForm } from 'react-hook-form';

const NAME_LENGTH = 25;
const DESC_LENGTH = 180;

type ICreateCommunityState = {
  name: string;
  description: string;
};

function CreateCommunityModal({ id, context }: ContextModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm<ICreateCommunityState>({
    mode: 'onBlur',
    defaultValues: { name: '', description: '' },
  });
  const name = watch('name');
  const description = watch('description');
  const { createCommunity, loading } = useCreateCommunity();

  const onSubmit: SubmitHandler<ICreateCommunityState> = async (values, e) => {
    e.preventDefault();

    await createCommunity({ name: values.name.toLowerCase(), description });

    context.closeModal(id);

    reset();
  };

  return (
    <>
      <Divider my="sm" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="lg" mt={20}>
          <Stack spacing="xs">
            <InputWrapper
              id="community-name"
              label="Name"
              error={errors.name ? errors.name.message : null}
            >
              <Input
                id="community-name"
                placeholder="Type community name"
                maxLength={NAME_LENGTH}
                {...register('name', {
                  setValueAs: (value) => value.trim(),
                  required: 'Name is required',
                  maxLength: NAME_LENGTH,
                  pattern: {
                    value: /^[^\s].\S+[^\s]$/,
                    message: 'Name should not contain spaces',
                  },
                })}
              />
            </InputWrapper>

            <Text size="xs">
              {NAME_LENGTH - name.length} characters remaining
            </Text>
          </Stack>

          <Stack spacing="xs">
            <Textarea
              variant="filled"
              label="Description"
              placeholder="Tell more about your community to others"
              maxRows={30}
              maxLength={DESC_LENGTH}
              {...register('description', {
                setValueAs: (value) => value.trim(),
                required: 'Description is required',
                maxLength: {
                  value: DESC_LENGTH,
                  message:
                    'Description length should be lesser than 180 letters',
                },
              })}
              autosize
            />
            <Text size="xs">
              {DESC_LENGTH - description.length} characters remaining
            </Text>
          </Stack>

          <Group position="right">
            <Button variant="outline">Cancel</Button>
            <Button
              variant="filled"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Create Community
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default CreateCommunityModal;
