import { ApolloError } from '@apollo/client';
import { showNotification } from '@mantine/notifications';
import { IoMdClose } from 'react-icons/io';

import { useFetchPostQuery, FetchPostQuery } from 'graphql-generated';

function setState(data: FetchPostQuery, error: ApolloError) {
  // for ssr fetchloading state
  if (!data && !data?.fetchPost) {
    return { post: null, state: 'LOADING' };
  }

  if (data.fetchPost.__typename === 'IPostType') {
    return { post: data.fetchPost, state: 'DATA' };
  }

  if (data.fetchPost.__typename === 'PostError' || error) {
    showNotification({
      message: data.fetchPost.message || 'something went wrong!',
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });

    return { post: null, state: 'ERROR' };
  }

  // default render loading
  return { post: null, state: 'LOADING' };
}

function useFetchPost({ postId }: { postId: string }) {
  const { data, error } = useFetchPostQuery({
    variables: { postId },
    fetchPolicy: 'cache-first',
  });

  const { post, state } = setState(data, error);

  return { post, state };
}

export default useFetchPost;
