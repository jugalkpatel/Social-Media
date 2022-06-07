import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';

export type GetCommunityQuery = {
  __typename?: 'Query';
  GetCommunity:
    | { __typename?: 'CommunityError'; message: string }
    | {
        __typename?: 'GetCommunityResult';
        id: string;
        title: string;
        description: string;
        banner: string;
        picture: string;
        createdAt: any;
        members: Array<{
          __typename?: 'GetCommunityMember';
          id: string;
        } | null>;
        posts?: Array<{
          __typename?: 'Post';
          id: string;
          title: string;
          content: string;
          createdAt: any;
          postedBy: { __typename?: 'User'; id: string; name: string };
        } | null> | null;
      };
};

export const GET_COMMUNITY = gql`
  query GetCommunity($name: String!) {
    GetCommunity(name: $name) {
      ... on GetCommunityResult {
        id
        title
        description
        banner
        picture
        members {
          id
        }
        posts {
          id
          title
          content
          createdAt
          postedBy {
            id
            name
          }
        }
        createdAt
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

  const { data: response } = await apolloClient.query<GetCommunityQuery>({
    query: GET_COMMUNITY,
    variables: { name },
  });

  if (
    response.GetCommunity &&
    response.GetCommunity.__typename === 'GetCommunityResult'
  ) {
    return response.GetCommunity;
  }

  if (
    response.GetCommunity &&
    response.GetCommunity.__typename === 'CommunityError'
  ) {
    message = response.GetCommunity.message;
  }

  throw new Error(message);
}

// try {
//   if (
//     response.GetCommunity &&
//     response.GetCommunity.__typename === 'GetCommunityResult'
//   ) {
//     const data = response.GetCommunity as GetComunityResult;

//     return data;
//   }

//   if (
//     response.GetCommunity &&
//     response.GetCommunity.__typename === 'CommunityError'
//   ) {
//     const { message: errorMessage } = response.GetCommunity as CommunityError;

//     message = errorMessage;
//   }

//   throw new Error(message);
// } catch (error) {
//   console.log({ error });
//   return null;
// }
