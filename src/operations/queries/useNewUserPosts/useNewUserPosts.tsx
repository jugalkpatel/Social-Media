import { useEffect } from 'react';
import { ApolloError, useReactiveVar } from '@apollo/client';

import { State } from 'types';
import {
  FetchAllUserPostsByTimeQuery,
  useFetchAllUserPostsByTimeQuery,
} from 'operations';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import { NO_OF_POSTS_AT_A_TIME, userCommunitiesVar } from 'lib';

type SetStateParams = CommonNotificationParms & {
  data: FetchAllUserPostsByTimeQuery;
  isError: ApolloError;
};

function setState({ data, isError, error: showError }: SetStateParams) {
  if (
    data &&
    data?.fetchAllUserPostsByTime &&
    data?.fetchAllUserPostsByTime.__typename === 'BatchPosts'
  ) {
    return {
      posts: data.fetchAllUserPostsByTime.posts,
      cursor: data.fetchAllUserPostsByTime.cursorId,
      state: 'DATA' as State,
    };
  }

  if (
    (data &&
      data?.fetchAllUserPostsByTime &&
      data.fetchAllUserPostsByTime.__typename === 'CommonError') ||
    isError
  ) {
    showError('error while fetching personalised new posts');
    return { posts: null, cursor: '', state: 'ERROR' as State };
  }

  return { posts: null, cursor: '', state: 'LOADING' as State };
}

function useNewUserPosts() {
  const {
    data,
    error: isError,
    fetchMore,
    refetch,
  } = useFetchAllUserPostsByTimeQuery({
    variables: {
      take: NO_OF_POSTS_AT_A_TIME,
    },
  });
  const { success, error } = useCommonNotifications();
  const { posts, state, cursor } = setState({ data, isError, success, error });
  const joinedCommunities = useReactiveVar(userCommunitiesVar);

  useEffect(() => {
    if (state === 'DATA') {
      refetch({ take: posts.length > 5 ? posts.length : 5 });
    }
  }, [joinedCommunities.length]);

  const fetchMorePosts = async () => {
    if (cursor) {
      await fetchMore({
        variables: { cursorId: cursor, take: NO_OF_POSTS_AT_A_TIME },
      });
    }
  };

  return { posts, state, fetchMorePosts };
}

export default useNewUserPosts;
