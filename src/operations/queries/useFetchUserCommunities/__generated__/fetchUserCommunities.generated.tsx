import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchUserCommunitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchUserCommunitiesQuery = { __typename?: 'Query', fetchUser: { __typename?: 'CommonError', message: string } | { __typename?: 'User', id: string, joinedCommunities?: Array<{ __typename?: 'Community', id: string, title: string, picture: string }> | null } };


export const FetchUserCommunitiesDocument = gql`
    query FetchUserCommunities {
  fetchUser {
    ... on User {
      id
      joinedCommunities {
        id
        title
        picture
      }
    }
    ... on CommonError {
      message
    }
  }
}
    `;

/**
 * __useFetchUserCommunitiesQuery__
 *
 * To run a query within a React component, call `useFetchUserCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUserCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<FetchUserCommunitiesQuery, FetchUserCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserCommunitiesQuery, FetchUserCommunitiesQueryVariables>(FetchUserCommunitiesDocument, options);
      }
export function useFetchUserCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserCommunitiesQuery, FetchUserCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserCommunitiesQuery, FetchUserCommunitiesQueryVariables>(FetchUserCommunitiesDocument, options);
        }
export type FetchUserCommunitiesQueryHookResult = ReturnType<typeof useFetchUserCommunitiesQuery>;
export type FetchUserCommunitiesLazyQueryHookResult = ReturnType<typeof useFetchUserCommunitiesLazyQuery>;
export type FetchUserCommunitiesQueryResult = Apollo.QueryResult<FetchUserCommunitiesQuery, FetchUserCommunitiesQueryVariables>;