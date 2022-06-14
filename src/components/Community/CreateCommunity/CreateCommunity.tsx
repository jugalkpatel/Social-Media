import { useState } from 'react';
import { useRouter } from 'next/router';
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
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';

import { showNotification } from '@mantine/notifications';

import { useCreateCommunityMutation } from './__generated__/create-community.generated';

const NAME_LENGTH = 20;
const DESC_LENGTH = 180;

function CreateCommunityModal({ id, context }: ContextModalProps) {
  const [{ name, description }, setCommuntunityFields] = useState({
    name: '',
    description: '',
  });
  const [createCommunityMutation, { loading }] = useCreateCommunityMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let message = 'something went wrong!';
    e.preventDefault();

    createCommunityMutation({
      variables: {
        description: description,
        name: name.toLowerCase(),
      },
    })
      .then((response) => {
        const { data } = response;

        if (
          data?.CreateCommunity &&
          data.CreateCommunity.__typename === 'CommunityResult'
        ) {
          const { id, title } = data.CreateCommunity;

          showNotification({
            message: 'community created successfully',
            autoClose: 3000,
            icon: <IoMdCheckmark />,
            color: 'green',
          });

          // close the modal
          context.closeModal(id);

          // redirect to community page
          router.push(`/c/${title}`);

          return;
        }

        if (
          data?.CreateCommunity &&
          data?.CreateCommunity.__typename === 'CommunityError'
        ) {
          message = data.CreateCommunity.message;
        }

        setCommuntunityFields({ name: '', description: '' });

        showNotification({
          message,
          autoClose: 3000,
          icon: <IoMdClose />,
          color: 'red',
        });
      })
      .catch((err) => {
        setCommuntunityFields({ name: '', description: '' });
        showNotification({
          message,
          autoClose: 3000,
          icon: <IoMdClose />,
          color: 'red',
        });
      });
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
