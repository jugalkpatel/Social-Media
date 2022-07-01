import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchUserQuery = { __typename?: 'Query', fetchUser: { __typename?: 'CommonError', message: string } | { __typename?: 'User', id: string, name: string, picture: string, joinedCommunities?: Array<{ __typename?: 'Community', id: string }> | null, posts?: Array<{ __typename?: 'Post', id: string } | null> | null, bookmarks?: Array<{ __typename?: 'Post', id: string } | null> | null, commentedOn?: Array<{ __typename?: 'Comment', id: string } | null> | null } };


export const FetchUserDocument = gql`
    query FetchUser {
  fetchUser {
    ... on CommonError {
      message
    }
    ... on User {
      id
      name
      picture
      joinedCommunities {
        id
      }
      posts {
        id
      }
      bookmarks {
        id
      }
      commentedOn {
        id
      }
    }
  }
}
    `;

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUserQuery(baseOptions?: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
      }
export function useFetchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<typeof useFetchUserLazyQuery>;
export type FetchUserQueryResult = Apollo.QueryResult<FetchUserQuery, FetchUserQueryVariables>;