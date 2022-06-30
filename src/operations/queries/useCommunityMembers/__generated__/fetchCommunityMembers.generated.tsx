import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchCommunityMembersQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;

export type FetchCommunityMembersQuery = {
  __typename?: 'Query';
  fetchCommunity:
    | { __typename?: 'CommonError'; message: string }
    | {
        __typename?: 'Community';
        id: string;
        members: Array<{ __typename?: 'User'; id: string } | null>;
      };
};

export const FetchCommunityMembersDocument = gql`
  query fetchCommunityMembers($name: String!) {
    fetchCommunity(name: $name) {
      ... on Community {
        id
        members {
          id
        }
      }
      ... on CommonError {
        message
      }
    }
  }
`;

/**
 * __useFetchCommunityMembersQuery__
 *
 * To run a query within a React component, call `useFetchCommunityMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCommunityMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCommunityMembersQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFetchCommunityMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchCommunityMembersQuery,
    FetchCommunityMembersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchCommunityMembersQuery,
    FetchCommunityMembersQueryVariables
  >(FetchCommunityMembersDocument, options);
}
export function useFetchCommunityMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchCommunityMembersQuery,
    FetchCommunityMembersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchCommunityMembersQuery,
    FetchCommunityMembersQueryVariables
  >(FetchCommunityMembersDocument, options);
}
export type FetchCommunityMembersQueryHookResult = ReturnType<
  typeof useFetchCommunityMembersQuery
>;
export type FetchCommunityMembersLazyQueryHookResult = ReturnType<
  typeof useFetchCommunityMembersLazyQuery
>;
export type FetchCommunityMembersQueryResult = Apollo.QueryResult<
  FetchCommunityMembersQuery,
  FetchCommunityMembersQueryVariables
>;
