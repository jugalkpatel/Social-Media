import { ApolloError } from '@apollo/client';
import {
  useFetchCommunityPostsQuery,
  FetchCommunityPostsQuery,
} from 'operations';
import { State } from 'types';

type Props = {
  title: string;
};

function setState(data: FetchCommunityPostsQuery, error: ApolloError) {
  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'Community'
  ) {
    return { posts: data.fetchCommunity.posts, state: 'DATA' as State };
  }

  if (
    (data &&
      data?.fetchCommunity &&
      data.fetchCommunity.__typename === 'CommonError') ||
    error
  ) {
    return { posts: null, state: 'ERROR' as State };
  }

  return { posts: null, state: 'LOADING' as State };
}

function useFetchCommunityPosts({ title }: Props) {
  const { data, error } = useFetchCommunityPostsQuery({
    variables: { name: title },
    fetchPolicy: 'cache-first',
  });

  const { posts, state } = setState(data, error);

  return { posts, state };
}

export default useFetchCommunityPosts;
