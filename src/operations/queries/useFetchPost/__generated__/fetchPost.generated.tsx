import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchPostQueryVariables = Types.Exact<{
  postId: Types.Scalars['String'];
}>;


export type FetchPostQuery = { __typename?: 'Query', fetchPost: { __typename?: 'CommonError', message: string } | { __typename?: 'Post', id: string, title: string, content: string, createdAt: any, community?: { __typename?: 'Community', id: string, title: string, picture: string } | null, postedBy?: { __typename?: 'User', id: string, name: string, picture: string } | null, bookmarkedBy?: Array<{ __typename?: 'User', id: string } | null> | null, votes: Array<{ __typename?: 'Vote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null>, comments?: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, user?: { __typename?: 'User', id: string, name: string, picture: string } | null, votes?: Array<{ __typename?: 'CommentVote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null> | null } | null> | null } };


export const FetchPostDocument = gql`
    query FetchPost($postId: String!) {
  fetchPost(postId: $postId) {
    ... on CommonError {
      message
    }
    ... on Post {
      id
      title
      content
      createdAt
      community {
        id
        title
        picture
      }
      postedBy {
        id
        name
        picture
      }
      bookmarkedBy {
        id
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
export function useFetchPostQuery(baseOptions: Apollo.QueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
      }
export function useFetchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
        }
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>;
export type FetchPostLazyQueryHookResult = ReturnType<typeof useFetchPostLazyQuery>;
export type FetchPostQueryResult = Apollo.QueryResult<FetchPostQuery, FetchPostQueryVariables>;