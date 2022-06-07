import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCommunityQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type GetCommunityQuery = { __typename?: 'Query', GetCommunity: { __typename?: 'CommunityError', message: string } | { __typename?: 'GetCommunityResult', id: string, title: string, description: string, banner: string, picture: string, createdAt: any, members: Array<{ __typename?: 'GetCommunityMember', id: string } | null>, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: any, postedBy: { __typename?: 'User', id: string, name: string } } | null> | null } };


export const GetCommunityDocument = gql`
    query GetCommunity($name: String!) {
  GetCommunity(name: $name) {
    ... on GetCommunityResult {
      id
      title
      description
      banner
      picture
      members {
        id
      }
      posts {
        id
        title
        content
        createdAt
        postedBy {
          id
          name
        }
      }
      createdAt
    }
    ... on CommunityError {
      message
    }
  }
}
    `;

/**
 * __useGetCommunityQuery__
 *
 * To run a query within a React component, call `useGetCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetCommunityQuery(baseOptions: Apollo.QueryHookOptions<GetCommunityQuery, GetCommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommunityQuery, GetCommunityQueryVariables>(GetCommunityDocument, options);
      }
export function useGetCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommunityQuery, GetCommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommunityQuery, GetCommunityQueryVariables>(GetCommunityDocument, options);
        }
export type GetCommunityQueryHookResult = ReturnType<typeof useGetCommunityQuery>;
export type GetCommunityLazyQueryHookResult = ReturnType<typeof useGetCommunityLazyQuery>;
export type GetCommunityQueryResult = Apollo.QueryResult<GetCommunityQuery, GetCommunityQueryVariables>;