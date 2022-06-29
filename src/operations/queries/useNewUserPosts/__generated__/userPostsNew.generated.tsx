import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchAllUserPostsByTimeQueryVariables = Types.Exact<{
  take: Types.Scalars['Int'];
  cursorId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type FetchAllUserPostsByTimeQuery = { __typename?: 'Query', fetchAllUserPostsByTime: { __typename?: 'BatchPosts', cursorId: string, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: any, community?: { __typename?: 'Community', id: string, title: string, picture: string } | null, postedBy?: { __typename?: 'User', id: string, name: string, picture: string } | null, bookmarkedBy?: Array<{ __typename?: 'User', id: string } | null> | null, votes: Array<{ __typename?: 'Vote', id: string, type: Types.VoteType, voteUser?: { __typename?: 'User', id: string } | null } | null>, comments?: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, user?: { __typename?: 'User', id: string, name: string, picture: string } | null, votes?: Array<{ __typename?: 'CommentVote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null> | null } | null> | null } | null> | null } | { __typename?: 'CommonError', message: string } };


export const FetchAllUserPostsByTimeDocument = gql`
    query FetchAllUserPostsByTime($take: Int!, $cursorId: String) {
  fetchAllUserPostsByTime(take: $take, cursorId: $cursorId) {
    ... on BatchPosts {
      cursorId
      posts {
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
          voteUser {
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
    ... on CommonError {
      message
    }
  }
}
    `;

/**
 * __useFetchAllUserPostsByTimeQuery__
 *
 * To run a query within a React component, call `useFetchAllUserPostsByTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUserPostsByTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUserPostsByTimeQuery({
 *   variables: {
 *      take: // value for 'take'
 *      cursorId: // value for 'cursorId'
 *   },
 * });
 */
export function useFetchAllUserPostsByTimeQuery(baseOptions: Apollo.QueryHookOptions<FetchAllUserPostsByTimeQuery, FetchAllUserPostsByTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllUserPostsByTimeQuery, FetchAllUserPostsByTimeQueryVariables>(FetchAllUserPostsByTimeDocument, options);
      }
export function useFetchAllUserPostsByTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllUserPostsByTimeQuery, FetchAllUserPostsByTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllUserPostsByTimeQuery, FetchAllUserPostsByTimeQueryVariables>(FetchAllUserPostsByTimeDocument, options);
        }
export type FetchAllUserPostsByTimeQueryHookResult = ReturnType<typeof useFetchAllUserPostsByTimeQuery>;
export type FetchAllUserPostsByTimeLazyQueryHookResult = ReturnType<typeof useFetchAllUserPostsByTimeLazyQuery>;
export type FetchAllUserPostsByTimeQueryResult = Apollo.QueryResult<FetchAllUserPostsByTimeQuery, FetchAllUserPostsByTimeQueryVariables>;