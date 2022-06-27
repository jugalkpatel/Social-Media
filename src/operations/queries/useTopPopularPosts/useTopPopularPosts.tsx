import { ApolloError } from '@apollo/client';

import { State } from 'types';
import {
  useFetchAllPostsByVotesQuery,
  FetchAllPostsByVotesQuery,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';
import { useCommonNotifications, CommonNotificationParms } from 'hooks';

type SetStateParams = CommonNotificationParms & {
  data: FetchAllPostsByVotesQuery;
  isError: ApolloError;
};

function setState({ data, isError, error }: SetStateParams) {
  if (
    data &&
    data?.fetchAllPostsByVotes &&
    data.fetchAllPostsByVotes.__typename === 'BatchPosts'
  ) {
    return {
      posts: data.fetchAllPostsByVotes.posts,
      cursor: data.fetchAllPostsByVotes.cursorId,
      state: 'DATA' as State,
    };
  }

  if (
    (data &&
      data?.fetchAllPostsByVotes &&
      data.fetchAllPostsByVotes.__typename === 'CommonError') ||
    isError
  ) {
    error('error while fetching all posts');
    return { posts: null, cursor: '', state: 'ERROR' as State };
  }

  return { posts: null, cursor: '', state: 'LOADING' as State };
}

function useTopPopularPosts() {
  const {
    data,
    error: isError,
    fetchMore,
  } = useFetchAllPostsByVotesQuery({
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

export default useTopPopularPosts;
