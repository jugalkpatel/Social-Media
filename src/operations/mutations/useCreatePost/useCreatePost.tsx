import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { IPostState } from 'types';
import { useCreatePostMutation, CreatePostMutationFn } from 'operations';

function create(create: CreatePostMutationFn) {
  return async (values: IPostState) => {
    let errorMessage = 'something went wrong!';
    try {
      const { data } = await create({
        variables: {
          title: values.title,
          community: values.community,
          content: values.content,
        },
      });

      if (data && data?.createPost && data.createPost.__typename === 'Post') {
        const { id, community } = data.createPost;

        showNotification({
          message: 'post created successfully',
          autoClose: 3000,
          icon: <IoMdCheckmark />,
          color: 'green',
        });

        // Router.push(`/c/${community}/posts/${id}`);
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
}

// make a function that takes mutation function
// return one function that takes values and make a network call
function useCreatePost() {
  const [mutationFunc, { loading }] = useCreatePostMutation();

  const createPost = create(mutationFunc);

  return { createPost, loading };
}

export default useCreatePost;
