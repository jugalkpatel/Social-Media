import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
  FetchPostQuery,
  FetchPostDocument,
  FetchPostQueryVariables,
} from 'graphql-generated';

export async function fetchPost(
  postId: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  let message = 'something went wrong!';

  const { data } = await apolloClient.query<
    FetchPostQuery,
    FetchPostQueryVariables
  >({
    query: FetchPostDocument,
    variables: { postId },
  });

  if (data.fetchPost && data.fetchPost.__typename === 'IPostType') {
    return data.fetchPost;
  }

  if (data.fetchPost && data.fetchPost.__typename === 'PostError') {
    message = data.fetchPost.message;
  }

  throw new Error(message);
}
