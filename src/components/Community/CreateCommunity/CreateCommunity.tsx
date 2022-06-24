import { useState } from 'react';
import { ContextModalProps } from '@mantine/modals';
import {
  Divider,
  TextInput,
  Button,
  Group,
  Textarea,
  Text,
  Stack,
} from '@mantine/core';

import { useCreateCommunity } from 'operations';

const NAME_LENGTH = 20;
const DESC_LENGTH = 180;

function CreateCommunityModal({ id, context }: ContextModalProps) {
  const [{ name, description }, setCommuntunityFields] = useState({
    name: '',
    description: '',
  });
  const { createCommunity, loading } = useCreateCommunity();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createCommunity({ name: name.toLowerCase(), description });

    context.closeModal(id);

    setCommuntunityFields({ name: '', description: '' });
  };

  return (
    <>
      <Divider my="sm" />
      <form onSubmit={handleSubmit}>
        <Stack spacing="lg" mt={20}>
          <Stack spacing="xs">
            <TextInput
              label="Name"
              description="The community name should be 10 characters or less."
              maxLength={20}
              value={name}
              onChange={(e) =>
                setCommuntunityFields((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />
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
              maxLength={180}
              value={description}
              onChange={(e) =>
                setCommuntunityFields((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              autosize
              required
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
