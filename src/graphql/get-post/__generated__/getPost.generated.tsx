import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPostQueryVariables = Types.Exact<{
  postId: Types.Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'IPostType', id: string, title: string, content: string, createdAt: any, bookmarkedBy?: Array<{ __typename?: 'IUserWithID', id: string } | null> | null, postedBy: { __typename?: 'IPostUser', id: string, name: string, picture: string }, community: { __typename?: 'IPostCommunity', id: string, title: string, description: string, banner: string, picture: string, createdAt: any }, votes?: Array<{ __typename?: 'ICommonVote', id: string, type: Types.VoteType, votedBy: { __typename?: 'IUserWithID', id: string } }> | null, comments?: Array<{ __typename?: 'IPostComment', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'IPostUser', id: string, name: string, picture: string }, votes?: Array<{ __typename?: 'ICommonVote', id: string, type: Types.VoteType, votedBy: { __typename?: 'IUserWithID', id: string } }> | null } | null> | null } | { __typename?: 'PostError', message: string } };


export const GetPostDocument = gql`
    query GetPost($postId: String!) {
  getPost(postId: $postId) {
    ... on IPostType {
      id
      title
      content
      createdAt
      bookmarkedBy {
        id
      }
      postedBy {
        id
        name
        picture
      }
      community {
        id
        title
        description
        banner
        picture
        createdAt
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
    ... on PostError {
      message
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;