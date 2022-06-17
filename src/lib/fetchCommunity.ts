import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import {
  FetchCommunityQuery,
  FetchCommunityQueryVariables,
  FetchCommunityDocument,
} from '../graphql-generated/fetch-community/__generated__/fetchCommunity.generated';

export const FETCH_PARTIAL_COMMUNITY = gql`
  query FetchCommunity($name: String!) {
    fetchCommunity(name: $name) {
      ... on FetchCommunityResult {
        id
        title
        createdAt
        banner
        description
        picture
        members {
          id
        }
      }
    }
  }
`;

export type FetchPartialCommunity = {
  __typename?: 'Query';
  fetchCommunity:
    | { __typename?: 'CommunityError'; message: string }
    | {
        __typename?: 'FetchCommunityResult';
        id: string;
        title: string;
        createdAt: any;
        banner: string;
        description: string;
        picture: string;
        members: Array<{ __typename?: 'CommunityUser'; id: string } | null>;
      };
};

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
  });

  if (
    data.fetchCommunity &&
    data.fetchCommunity.__typename === 'FetchCommunityResult'
  ) {
    return data.fetchCommunity;
  }

  if (
    data.fetchCommunity &&
    data.fetchCommunity.__typename === 'CommunityError'
  ) {
    message = data.fetchCommunity.message;
  }

  throw new Error(message);
}

export async function fetchPartialCommunity(
  name: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  let message = 'something went wrong!';

  const { data } = await apolloClient.query<
    FetchPartialCommunity,
    FetchCommunityQueryVariables
  >({
    query: FETCH_PARTIAL_COMMUNITY,
    variables: { name },
  });

  if (
    data.fetchCommunity &&
    data.fetchCommunity.__typename === 'FetchCommunityResult'
  ) {
    return data.fetchCommunity;
  }

  if (
    data.fetchCommunity &&
    data.fetchCommunity.__typename === 'CommunityError'
  ) {
    message = data.fetchCommunity.message;
  }

  throw new Error(message);
}
