import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import * as Types from '../graphql/types';

export type FetchCommunityQuery = {
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
        updatedAt: any;
        picture: string;
        creator: { __typename?: 'CommunityUser'; id: string };
        members: Array<{ __typename?: 'CommunityUser'; id: string } | null>;
        posts?: Array<{
          __typename?: 'IPostType';
          id: string;
          title: string;
          content: string;
          createdAt: any;
          bookmarkedBy?: Array<{
            __typename?: 'IUserWithID';
            id: string;
          } | null> | null;
          postedBy: {
            __typename?: 'IPostUser';
            id: string;
            name: string;
            picture: string;
          };
          votes?: Array<{
            __typename?: 'ICommonVote';
            id: string;
            type: Types.VoteType;
            votedBy: { __typename?: 'IUserWithID'; id: string };
          }> | null;
          comments?: Array<{
            __typename?: 'IPostComment';
            id: string;
            text: string;
            createdAt: any;
            updatedAt: any;
            user: {
              __typename?: 'IPostUser';
              id: string;
              name: string;
              picture: string;
            };
            votes?: Array<{
              __typename?: 'ICommonVote';
              id: string;
              type: Types.VoteType;
              votedBy: { __typename?: 'IUserWithID'; id: string };
            }> | null;
          } | null> | null;
        } | null> | null;
      };
};
export const FETCH_COMMUNITY = gql`
  query FetchCommunity($name: String!) {
    fetchCommunity(name: $name) {
      ... on FetchCommunityResult {
        id
        title
        createdAt
        banner
        description
        updatedAt
        picture
        creator {
          id
        }
        members {
          id
        }
        posts {
          id
          title
          content
          createdAt
          bookmarkedBy {
            id
          }
          postedBy {
            id
            name
            picture
          }
          votes {
            id
            type
            votedBy {
              id
            }
          }
          comments {
            id
            text
            createdAt
            updatedAt
            user {
              id
              name
              picture
            }
            votes {
              id
              type
              votedBy {
                id
              }
            }
          }
        }
      }
      ... on CommunityError {
        message
      }
    }
  }
`;

export async function fetchCommunity(
  name: string | string[],
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  let message = 'something went wrong!';

  const { data } = await apolloClient.query<FetchCommunityQuery>({
    query: FETCH_COMMUNITY,
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
