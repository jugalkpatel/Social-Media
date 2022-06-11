import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import * as Types from '../graphql/types';

export type GetPostQuery = {
  __typename?: 'Query';
  getPost:
    | {
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
        community: {
          __typename?: 'IPostCommunity';
          id: string;
          title: string;
          description: string;
          banner: string;
          picture: string;
          createdAt: any;
          members?: Array<{ __typename?: 'IUserWithID'; id: string }> | null;
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
      }
    | { __typename?: 'PostError'; message: string };
};

export const FETCH_POST = gql`
  query GetPost($postId: String!) {
    getPost(postId: $postId) {
      ... on IPostType {
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
        community {
          id
          title
          description
          banner
          picture
          createdAt
          members {
            id
          }
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
      ... on PostError {
        message
      }
    }
  }
`;

export async function fetchPost(
  postId: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  let message = 'something went wrong!';

  const { data } = await apolloClient.query<GetPostQuery>({
    query: FETCH_POST,
    variables: { postId },
  });

  console.log({ data });

  if (data?.getPost && data.getPost.__typename === 'IPostType') {
    return data.getPost;
  }

  if (data?.getPost && data.getPost.__typename === 'PostError') {
    message = data.getPost.message;
  }

  throw new Error(message);
}
