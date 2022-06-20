import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  FetchCommunityQuery,
  FetchCommunityQueryVariables,
  FetchCommunityDocument,
} from 'graphql-generated';

export async function fetchCommunity(
  name: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  let message = 'something went wrong!';

  const { data } = await apolloClient.query<
    FetchCommunityQuery,
    FetchCommunityQueryVariables
  >({
    query: FetchCommunityDocument,
    variables: { name },
    fetchPolicy: 'network-only',
  });

  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'Community'
  ) {
    return data.fetchCommunity;
  }

  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'CommonError'
  ) {
    message = data.fetchCommunity.message;
  }

  throw new Error(message);
}
