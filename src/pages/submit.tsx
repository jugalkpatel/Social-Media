import { useReactiveVar } from '@apollo/client';
import { useForm } from '@mantine/form';
import {
  Container,
  Title,
  Divider,
  createStyles,
  Input,
  Stack,
  Button,
  Loader,
  Center,
  Text,
} from '@mantine/core';

import { IPostState } from 'types';
import { useFetchUserCommunities, useCreatePost } from 'operations';
import { SelectCommunity, Wysiwyg } from 'components';
import { authorizationVar } from 'lib';

const useStyles = createStyles((theme) => ({
  height: {
    height: '50vh',

    [theme.fn.largerThan('xl')]: {
      height: '60vh',
    },
  },
}));

const handleUpload = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_PRESET);

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        resolve(result.url);
      })
      .catch((_) => {
        reject(new Error('Upload Failed'));
      });
  });

const TITLE_LENGTH = 200;

function Submit() {
  const { classes } = useStyles();
  const { communities, state } = useFetchUserCommunities();
  const { createPost, loading } = useCreatePost();
  const form = useForm<IPostState>({
    initialValues: {
      community: '',
      title: '',
      content: '',
    },
    validate: {
      community: (value) =>
        !communities.find(({ id }) => value === id)
          ? 'Please select valid value for communities'
          : null,
      title: (value) =>
        value.length <= 0 ? 'Title atleast include 1 character' : null,
      content: (value) =>
        !value.length ? 'Post content should not be empty!' : null,
    },
  });
  const isAuthorized = useReactiveVar(authorizationVar);

  // useEffect(() => {
  //   if (!isAuthorized || state === 'ERROR') {
  //     router.push('/');
  //   }
  // }, [isAuthorized]);

  if (!isAuthorized || state === 'ERROR') {
    return null;
  }

  const communitiesData =
    communities && communities.length
      ? communities.map(({ id, picture, title }) => {
          return {
            image: picture,
            label: title.replace(/^\w/, (c) => c.toUpperCase()),
            value: id,
          };
        })
      : [];

  const onSubmitClick = async (values: IPostState) => {
    await createPost(values);
  };

  return (
    <Container py={25}>
      {state === 'LOADING' ? (
        <Center className={classes.height}>
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <Title order={2}>Create a post</Title>
          <Divider my="xs" size="xs" />

          <form onSubmit={form.onSubmit((values) => onSubmitClick(values))}>
            <SelectCommunity
              communities={communitiesData}
              {...form.getInputProps('community')}
            />

            <Stack spacing="sm">
              <Stack sx={{ gap: '10px' }}>
                <Input
                  size="sm"
                  maxLength={TITLE_LENGTH}
                  placeholder="Title"
                  required
                  {...form.getInputProps('title')}
                />
                <Text size="xs" pl={3}>
                  {TITLE_LENGTH - form.values.title.length} characters remaining
                </Text>
              </Stack>

              <Divider size="xs" />

              <Wysiwyg
                value={form.values.content}
                onChange={(value, delta, sources, editor) => {
                  form.setFieldValue(
                    'content',
                    JSON.stringify(editor.getContents()),
                  );
                }}
                className={classes.height}
                onImageUpload={handleUpload}
                sx={{ maxWidth: '100%', overflowY: 'auto' }}
              />
            </Stack>
            <Divider my="md" size="xs" />

            <Stack align="flex-end">
              <Button type="submit" variant="filled" px={25} loading={loading}>
                Post
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Container>
  );
}

export default Submit;
