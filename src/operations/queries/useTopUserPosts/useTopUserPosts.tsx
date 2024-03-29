import { useEffect } from 'react';
import { ApolloError, useReactiveVar } from '@apollo/client';

import { State } from 'types';
import {
  useFetchAllUserPostsByVoteQuery,
  FetchAllUserPostsByVoteQuery,
} from 'operations';
import {
  useCommonNotifications,
  CommonNotificationParms,
  useShowProgressNotifications,
} from 'hooks';
import { NO_OF_POSTS_AT_A_TIME, userCommunitiesVar } from 'lib';

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
    refetch,
  } = useFetchAllUserPostsByVoteQuery({
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });
  const { error, success } = useCommonNotifications();
  const { posts, state, cursor } = setState({ data, isError, success, error });
  const { start: fetchMorePostsStart, success: fetchMoreSuccess } =
    useShowProgressNotifications({ id: 'user-posts-top', time: 500 });
  const joinedCommunities = useReactiveVar(userCommunitiesVar);

  useEffect(() => {
    if (state === 'DATA') {
      refetch({ take: posts.length > 5 ? posts.length : 5 });
    }
  }, [joinedCommunities.length]);

  const fetchMorePosts = async () => {
    if (cursor) {
      fetchMorePostsStart('hang on! fetching more posts');
      await fetchMore({
        variables: { cursorId: cursor, take: NO_OF_POSTS_AT_A_TIME },
      });
      fetchMoreSuccess('new posts are added successfully');
    }
  };

  return { posts, state, fetchMorePosts };
}

export default useTopUserPosts;
