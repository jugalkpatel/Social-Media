import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchAllCommunitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchAllCommunitiesQuery = { __typename?: 'Query', fetchAllCommunities: { __typename?: 'CommonError', message: string } | { __typename?: 'CommunityList', communities?: Array<{ __typename?: 'Community', id: string, title: string, picture: string, members: Array<{ __typename?: 'User', id: string } | null> } | null> | null } };


export const FetchAllCommunitiesDocument = gql`
    query FetchAllCommunities {
  fetchAllCommunities {
    ... on CommonError {
      message
    }
    ... on CommunityList {
      communities {
        id
        title
        picture
        members {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useFetchAllCommunitiesQuery__
 *
 * To run a query within a React component, call `useFetchAllCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllCommunitiesQuery, FetchAllCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllCommunitiesQuery, FetchAllCommunitiesQueryVariables>(FetchAllCommunitiesDocument, options);
      }
export function useFetchAllCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllCommunitiesQuery, FetchAllCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllCommunitiesQuery, FetchAllCommunitiesQueryVariables>(FetchAllCommunitiesDocument, options);
        }
export type FetchAllCommunitiesQueryHookResult = ReturnType<typeof useFetchAllCommunitiesQuery>;
export type FetchAllCommunitiesLazyQueryHookResult = ReturnType<typeof useFetchAllCommunitiesLazyQuery>;
export type FetchAllCommunitiesQueryResult = Apollo.QueryResult<FetchAllCommunitiesQuery, FetchAllCommunitiesQueryVariables>;