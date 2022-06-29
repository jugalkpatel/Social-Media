import { ApolloError } from '@apollo/client';

import { State } from 'types';
import {
  useFetchAllUserPostsByVoteQuery,
  FetchAllUserPostsByVoteQuery,
} from 'operations';
import { useCommonNotifications, CommonNotificationParms } from 'hooks';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';

type SetStateParams = CommonNotificationParms & {
  data: FetchAllUserPostsByVoteQuery;
  isError: ApolloError;
};

function setState({ data, isError, error: showError }: SetStateParams) {
  if (
    (data &&
      data?.fetchAllUserPostsByVote &&
      data.fetchAllUserPostsByVote.__typename === 'CommonError') ||
    isError
  ) {
    const message =
      data.fetchAllUserPostsByVote.__typename === 'CommonError'
        ? data.fetchAllUserPostsByVote.message
        : 'error while fetching personalise';
    showError(message);
    return { posts: null, cursor: '', state: 'ERROR' as State };
  }

  if (
    data &&
    data?.fetchAllUserPostsByVote &&
    data.fetchAllUserPostsByVote.__typename === 'BatchPosts'
  ) {
    return {
      posts: data.fetchAllUserPostsByVote.posts,
      cursor: data.fetchAllUserPostsByVote.cursorId,
      state: 'DATA' as State,
    };
  }
  return { posts: null, cursor: '', state: 'LOADING' as State };
}

function useTopUserPosts() {
  const {
    data,
    error: isError,
    fetchMore,
  } = useFetchAllUserPostsByVoteQuery({
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });
  const { error, success } = useCommonNotifications();
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

export default useTopUserPosts;
