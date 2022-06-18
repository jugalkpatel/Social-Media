import { ApolloError, gql, useQuery } from '@apollo/client';

import * as Types from 'graphql-generated';
import { FetchPostQueryVariables } from 'graphql-generated';

export type FetchPostCommentsQuery = {
  fetchPost:
    | {
        __typename?: 'IPostType';
        id: string;
        comments?: Array<{
          __typename?: 'Comment';
          id: string;
          text: string;
          createdAt: any;
          updatedAt: any;
          post: { __typename?: 'PostWithId'; id: string };
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
          } | null> | null;
        } | null> | null;
      }
    | { __typename?: 'PostError'; message: string };
};

export const FETCH_POST_COMMENTS = gql`
  query FetchPost($postId: String!) {
    fetchPost(postId: $postId) {
      ... on IPostType {
        id
        comments {
          id
          text
          createdAt
          updatedAt
          post {
            id
          }
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

type Props = {
  postId: string;
};

function setState(data: FetchPostCommentsQuery, error: ApolloError) {
  if (!data && !data?.fetchPost) {
    return { comments: [], state: 'LOADING' };
  }

  if (data.fetchPost.__typename === 'PostError' || error) {
    return { comments: [], state: 'ERROR' };
  }

  if (data.fetchPost.__typename === 'IPostType') {
    return { comments: data.fetchPost.comments, state: 'DATA' };
  }

  return { comments: [], state: 'LOADING' };
}

function useFetchPostComments({ postId }: Props) {
  const { data, error } = useQuery<
    FetchPostCommentsQuery,
    FetchPostQueryVariables
  >(FETCH_POST_COMMENTS, { variables: { postId }, fetchPolicy: 'cache-only' });

  const { comments, state } = setState(data, error);

  return { comments, state };
}

export default useFetchPostComments;
