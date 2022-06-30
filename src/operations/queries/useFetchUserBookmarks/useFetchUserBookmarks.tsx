import { State } from 'types';
import { ApolloError } from '@apollo/client';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';
import {
  useFetchUserBookmarksQuery,
  FetchUserBookmarksQuery,
} from 'operations';
import { useEffect } from 'react';

type FetchBookmarkParams = {
  data: FetchUserBookmarksQuery;
  isError: ApolloError;
};

function setState({ data, isError }: FetchBookmarkParams) {
  if (
    (data &&
      data?.fetchUserBookmarks &&
      data.fetchUserBookmarks.__typename === 'CommonError') ||
    isError
  ) {
    return { posts: null, cursor: '', state: 'ERROR' as State };
  }

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'BatchPosts'
  ) {
    return {
      posts: data.fetchUserBookmarks.posts,
      cursor: data.fetchUserBookmarks.cursorId,
      state: 'DATA' as State,
    };
  }

  return { posts: null, cursor: '', state: 'LOADING' as State };
}

function useFetchUserBookmarks() {
  const {
    data,
    error: isError,
    refetch,
    fetchMore,
  } = useFetchUserBookmarksQuery({
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  const { posts, cursor, state } = setState({ data, isError });

  // useEffect(() => {
  //   if (state === 'DATA') {
  //     refetch();
  //   }
  // }, []);

  const fetchMorePosts = async () => {
    if (cursor) {
      await fetchMore({
        variables: { cursorId: cursor, take: NO_OF_POSTS_AT_A_TIME },
      });
    }
  };

  return { posts, state, fetchMorePosts };
}

export default useFetchUserBookmarks;
