import { ApolloError } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
    return {
      posts: data.fetchAllPosts.posts,
      cursor: data.fetchAllPosts.cursorId,
      state: 'DATA' as State,
    };
  }

  if (
    (data &&
      data?.fetchAllPosts &&
      data.fetchAllPosts.__typename === 'CommonError') ||
    isError
  ) {
    error('error while fetching all posts');
    return { posts: null, cursor: '', state: 'ERROR' as State };
  }

  return { posts: null, cursor: '', state: 'LOADING' as State };
}

function usePopularPosts() {
  const {
    data,
    error: isError,
    fetchMore,
  } = useFetchAllPostsQuery({
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });
  const { success, error } = useCommonNotifications();
  const [morePostsLoading, setMorePostsLoading] = useState(false);
  const { posts, state, cursor } = setState({
    data,
    isError,
    success,
    error,
  });

  const fetchMorePosts = async () => {
    console.log({ cursor });
    if (cursor) {
      await fetchMore({
        variables: { cursorId: cursor, take: NO_OF_POSTS_AT_A_TIME },
      });
    }
  };

  console.log({ posts });

  return { posts, state, cursor, fetchMorePosts, morePostsLoading };
}

export default usePopularPosts;
