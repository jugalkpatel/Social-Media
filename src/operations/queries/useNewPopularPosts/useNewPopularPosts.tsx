import { ApolloError } from '@apollo/client';

import { State } from 'types';
import {
  useFetchAllPostsByTimeQuery,
  FetchAllPostsByTimeQuery,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';
import { useCommonNotifications, CommonNotificationParms } from 'hooks';

type SetStateParams = CommonNotificationParms & {
  data: FetchAllPostsByTimeQuery;
  isError: ApolloError;
};

function setState({ data, isError, error }: SetStateParams) {
  if (
    data &&
    data?.fetchAllPostsByTime &&
    data.fetchAllPostsByTime.__typename === 'BatchPosts'
  ) {
    return {
      posts: data.fetchAllPostsByTime.posts,
      cursor: data.fetchAllPostsByTime.cursorId,
      state: 'DATA' as State,
    };
  }

  if (
    (data &&
      data?.fetchAllPostsByTime &&
      data.fetchAllPostsByTime.__typename === 'CommonError') ||
    isError
  ) {
    error('error while fetching posts');
    return { posts: null, cursor: '', state: 'ERROR' as State };
  }

  return { posts: null, cursor: '', state: 'LOADING' as State };
}

function useNewPopularPosts() {
  const {
    data,
    error: isError,
    fetchMore,
  } = useFetchAllPostsByTimeQuery({
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });
  const { success, error } = useCommonNotifications();
  const { posts, state, cursor } = setState({ data, isError, success, error });

  const fetchMorePosts = async () => {
    if (cursor) {
      await fetchMore({
        variables: { cursorId: cursor, take: NO_OF_POSTS_AT_A_TIME },
      });
    }
  };

  return { posts, state, fetchMorePosts };
}

export default useNewPopularPosts;
