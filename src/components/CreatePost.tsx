import { useForm } from '@mantine/form';
import {
  Container,
  Title,
  Divider,
  createStyles,
  Stack,
  Button,
  Loader,
  Center,
  Text,
  TextInput,
  InputWrapper,
} from '@mantine/core';

import { IPostState } from 'types';
import { SelectCommunity, Wysiwyg } from 'components';
import { useCreatePost, useFetchUserCommunities } from 'operations';

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

type IPostStateWithLength = IPostState & {
  contentLength: number;
};

const TITLE_LENGTH = 200;

function CreatePost() {
  const { classes } = useStyles();
  const { communities, state } = useFetchUserCommunities();
  const { createPost, loading } = useCreatePost();
  const form = useForm<IPostStateWithLength>({
    initialValues: {
      community: '',
      title: '',
      content: '',
      contentLength: 0,
    },
    validate: {
      community: (value) =>
        !communities.find(({ id }) => value === id)
          ? 'Please select valid value for communities'
          : null,
      title: (value) =>
        value.length <= 1 ? 'Title should include atleast 2 letters' : null,
      content: (value) =>
        value.length < 2 ? 'content must have at least 2 letters' : null,
      contentLength: (value) =>
        value - 1 <= 4
          ? 'Post Content must contain a minimum of 5 letters.'
          : null,
    },
  });

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
                <TextInput
                  id="title-input"
                  size="sm"
                  maxLength={TITLE_LENGTH}
                  placeholder="Enter Post Title"
                  {...form.getInputProps('title')}
                  required
                />
                <Text size="xs" pl={3}>
                  {TITLE_LENGTH - form.values.title.length} characters remaining
                </Text>
              </Stack>

              <Divider size="xs" />

              <InputWrapper
                id="content-input"
                error={
                  form?.errors && form.errors?.contentLength
                    ? form.errors.contentLength
                    : null
                }
              >
                <Wysiwyg
                  id="content-input"
                  value={form.values.content}
                  onChange={(value, delta, sources, editor) => {
                    form.setFieldValue('contentLength', editor.getLength());
                    form.setFieldValue(
                      'content',
                      JSON.stringify(editor.getContents()),
                    );
                  }}
                  className={classes.height}
                  onImageUpload={handleUpload}
                  sx={{ maxWidth: '100%', overflowY: 'auto' }}
                />
              </InputWrapper>
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

export default CreatePost;
