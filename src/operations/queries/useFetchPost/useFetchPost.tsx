import { ApolloError } from '@apollo/client';

import { State } from 'types';
import { useFetchPostQuery, FetchPostQuery } from 'operations';

// function setState(data: FetchPostQuery, error: ApolloError) {
//   // for ssr fetchloading state
//   if (!data && !data?.fetchPost) {
//     return { post: null, state: 'LOADING' };
//   }

//   if (data.fetchPost.__typename === 'IPostType') {
//     return { post: data.fetchPost, state: 'DATA' };
//   }

//   if (data.fetchPost.__typename === 'PostError' || error) {
//     showNotification({
//       message: data.fetchPost.message || 'something went wrong!',
//       autoClose: 3000,
//       icon: <IoMdClose />,
//       color: 'red',
//     });

//     return { post: null, state: 'ERROR' };
//   }

//   // default render loading
//   return { post: null, state: 'LOADING' };
// }

function setState(data: FetchPostQuery, error: ApolloError) {
  if (data && data?.fetchPost && data.fetchPost.__typename === 'Post') {
    return { post: data.fetchPost, state: 'DATA' as State };
  }

  if (
    (data && data?.fetchPost && data.fetchPost.__typename === 'CommonError') ||
    error
  ) {
    return { post: null, state: 'ERROR' as State };
  }

  return { post: null, state: 'LOADING' as State };
}

function useFetchPost({ postId }: { postId: string }) {
  const { data, error } = useFetchPostQuery({ variables: { postId } });

  const { post, state } = setState(data, error);

  return { post, state };
}

export default useFetchPost;
