import { ApolloError } from '@apollo/client';

import { State } from 'types';
import { useCommonNotifications, CommonNotificationParms } from 'hooks';
import { useFetchAllPostsQuery, FetchAllPostsQuery } from 'operations';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';

type SetStateParams = CommonNotificationParms & {
  data: FetchAllPostsQuery;
  isError: ApolloError;
};

function setState({ data, isError, error }: SetStateParams) {
  if (
    data &&
    data?.fetchAllPosts &&
    data.fetchAllPosts.__typename === 'BatchPosts'
  ) {
    return { posts: data.fetchAllPosts.posts, state: 'DATA' as State };
  }

  if (
    (data &&
      data?.fetchAllPosts &&
      data.fetchAllPosts.__typename === 'CommonError') ||
    isError
  ) {
    error('error while fetching all posts');
    return { posts: null, state: 'ERROR' as State };
  }

  return { posts: null, state: 'LOADING' as State };
}

function usePopularPosts() {
  const { data, error: isError } = useFetchAllPostsQuery({
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });
  const { success, error } = useCommonNotifications();

  const { posts, state } = setState({ data, isError, success, error });

  return { posts, state };
}

export default usePopularPosts;
