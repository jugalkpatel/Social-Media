import Router from 'next/router';
import { useReactiveVar, ApolloError } from '@apollo/client';
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
import { showNotification } from '@mantine/notifications';

import { SelectCommunity, Wysiwyg } from 'components';
import { authorizationVar } from 'lib';
import {
  useGetUserCommunitiesQuery,
  GetUserCommunitiesQuery,
} from '../graphql-generated/user-communities/__generated__/getUserCommunities.generated';
import {
  useCreatePostMutation,
  CreatePostMutationFn,
} from '../graphql-generated/create-post/__generated__/createPost.generated';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

type IPostState = {
  community: string;
  title: string;
  content: string;
};

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

const onSubmitClick = async ({
  createPost,
  values,
}: {
  createPost: CreatePostMutationFn;
  values: IPostState;
}) => {
  let errorMessage = 'something went wrong!';
  try {
    const { data } = await createPost({
      variables: {
        title: values.title,
        community: values.community,
        content: values.content,
      },
    });

    if (data?.createPost && data.createPost.__typename === 'CreatePostResult') {
      const { id, title, community } = data.createPost;

      console.log({ id, title, community });

      showNotification({
        message: 'post created successfully',
        autoClose: 3000,
        icon: <IoMdCheckmark />,
        color: 'green',
      });

      Router.push(`/c/${community}/posts/${id}`);
    }

    if (data?.createPost && data.createPost.__typename === 'PostError') {
      const { message } = data.createPost;

      errorMessage = message;

      throw new Error();
    }
  } catch (error) {
    showNotification({
      message: errorMessage,
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });
  }
};

// render a loading state initially
// show skeleton till component fetch all user communities
function setState(data: GetUserCommunitiesQuery, error: ApolloError) {
  if (
    data?.getUserCommunities &&
    data.getUserCommunities.__typename === 'IUserCommunites'
  ) {
    return { communities: data.getUserCommunities.communities, state: 'DATA' };
  }

  if (
    (data?.getUserCommunities &&
      data.getUserCommunities.__typename === 'UserError') ||
    error
  ) {
    return { communities: null, state: 'ERROR' };
  }

  return { communities: null, state: 'LOADING' };
}

const TITLE_LENGTH = 200;

function Submit() {
  const { classes } = useStyles();
  const { data, error } = useGetUserCommunitiesQuery();
  const [createPost, { loading }] = useCreatePostMutation();
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
  // const router = useRouter();
  const { communities, state } = setState(data, error);

  console.log({ communities, state });

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

  // save quill data to the db
  // store image and send link: figure out cloudinary

  console.log(form.values);

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

          <form
            onSubmit={form.onSubmit((values) =>
              onSubmitClick({
                createPost,
                values,
              }),
            )}
          >
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
// const handleClick = () => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('quill', value);
//   }

//   router.push('/editor');
// };

// fix title of submit
// upgrade mantine
// create post
// fetch only those communities of which user if part of
// make page protected

/* <Wysiwyg
        theme="snow"
        value={value}
        onChange={(content, delta, _source, editor) => {
          // console.log(editor.getContents());
          const foo = editor.getContents();
          console.log(foo.ops.toString());
        }}
        modules={modules}
        formats={formats}
      >
        <div style={{ height: '50vh' }} />
      </Wysiwyg> */

/* <RichTextEditor /> */

// import 'react-quill/dist/quill.snow.css';

// const handleImageUpload = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const formData = new FormData();

//     formData.append('image', file);

//     console.log({ formData });

//     fetch(
//       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`,
//       {
//         method: 'POST',
//         body: formData,
//       },
//     )
//       .then((response) => response.json())
//       .then((result) => resolve(result.data.url));
//   });
// };

// for image upload image to the store and then use that url here.

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   Container
// };

// const modules = {
//   toolbar: {
//     Container: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [
//         { list: 'ordered' },
//         { list: 'bullet' },
//         { indent: '-1' },
//         { indent: '+1' },
//       ],
//       ['link', 'image', 'video'],
//       ['clean'],
//     ],
//   },
// };

// const formats = [
//   'header',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
// ];
