import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchCommunityQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type FetchCommunityQuery = { __typename?: 'Query', fetchCommunity: { __typename?: 'CommunityError', message: string } | { __typename?: 'FetchCommunityResult', id: string, title: string, createdAt: any, banner: string, description: string, updatedAt: any, picture: string, creator: { __typename?: 'CommunityUser', id: string }, members: Array<{ __typename?: 'CommunityUser', id: string } | null> } };


export const FetchCommunityDocument = gql`
    query FetchCommunity($name: String!) {
  fetchCommunity(name: $name) {
    ... on FetchCommunityResult {
      id
      title
      createdAt
      banner
      description
      updatedAt
      picture
      creator {
        id
      }
      members {
        id
      }
    }
    ... on CommunityError {
      message
    }
  }
}
    `;

/**
 * __useFetchCommunityQuery__
 *
 * To run a query within a React component, call `useFetchCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCommunityQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFetchCommunityQuery(baseOptions: Apollo.QueryHookOptions<FetchCommunityQuery, FetchCommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCommunityQuery, FetchCommunityQueryVariables>(FetchCommunityDocument, options);
      }
export function useFetchCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCommunityQuery, FetchCommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCommunityQuery, FetchCommunityQueryVariables>(FetchCommunityDocument, options);
        }
export type FetchCommunityQueryHookResult = ReturnType<typeof useFetchCommunityQuery>;
export type FetchCommunityLazyQueryHookResult = ReturnType<typeof useFetchCommunityLazyQuery>;
export type FetchCommunityQueryResult = Apollo.QueryResult<FetchCommunityQuery, FetchCommunityQueryVariables>;