import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchPostQueryVariables = Types.Exact<{
  postId: Types.Scalars['String'];
}>;

export type FetchPostQuery = {
  __typename?: 'Query';
  fetchPost:
    | {
        __typename?: 'IPostType';
        id: string;
        title: string;
        content: string;
        createdAt: any;
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
          picture: string;
        };
        votes?: Array<{
          __typename?: 'ICommonVote';
          id: string;
          type: Types.VoteType;
          votedBy: { __typename?: 'IUserWithID'; id: string };
        }> | null;
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
        bookmarkedBy?: Array<{
          __typename?: 'IUserWithID';
          id: string;
        } | null> | null;
      }
    | { __typename?: 'PostError'; message: string };
};

export const FetchPostDocument = gql`
  query FetchPost($postId: String!) {
    fetchPost(postId: $postId) {
      ... on IPostType {
        id
        title
        content
        createdAt
        postedBy {
          id
          name
          picture
        }
        community {
          id
          title
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
        bookmarkedBy {
          id
        }
      }
      ... on PostError {
        message
      }
    }
  }
`;

/**
 * __useFetchPostQuery__
 *
 * To run a query within a React component, call `useFetchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useFetchPostQuery(
  baseOptions: Apollo.QueryHookOptions<FetchPostQuery, FetchPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchPostQuery, FetchPostQueryVariables>(
    FetchPostDocument,
    options,
  );
}
export function useFetchPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchPostQuery,
    FetchPostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchPostQuery, FetchPostQueryVariables>(
    FetchPostDocument,
    options,
  );
}
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>;
export type FetchPostLazyQueryHookResult = ReturnType<
  typeof useFetchPostLazyQuery
>;
export type FetchPostQueryResult = Apollo.QueryResult<
  FetchPostQuery,
  FetchPostQueryVariables
>;
