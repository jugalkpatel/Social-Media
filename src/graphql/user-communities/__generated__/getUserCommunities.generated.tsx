import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserCommunitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserCommunitiesQuery = { __typename?: 'Query', getUserCommunities: { __typename?: 'IUserCommunites', id: string, communities?: Array<{ __typename?: 'IUserCommunity', id: string, picture: string, title: string } | null> | null } | { __typename?: 'UserError', message: string } };


export const GetUserCommunitiesDocument = gql`
    query GetUserCommunities {
  getUserCommunities {
    ... on IUserCommunites {
      id
      communities {
        id
        picture
        title
      }
    }
    ... on UserError {
      message
    }
  }
}
    `;

/**
 * __useGetUserCommunitiesQuery__
 *
 * To run a query within a React component, call `useGetUserCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>(GetUserCommunitiesDocument, options);
      }
export function useGetUserCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>(GetUserCommunitiesDocument, options);
        }
export type GetUserCommunitiesQueryHookResult = ReturnType<typeof useGetUserCommunitiesQuery>;
export type GetUserCommunitiesLazyQueryHookResult = ReturnType<typeof useGetUserCommunitiesLazyQuery>;
export type GetUserCommunitiesQueryResult = Apollo.QueryResult<GetUserCommunitiesQuery, GetUserCommunitiesQueryVariables>;