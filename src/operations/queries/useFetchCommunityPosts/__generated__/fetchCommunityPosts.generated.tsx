import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchCommunityPostsQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type FetchCommunityPostsQuery = { __typename?: 'Query', fetchCommunity: { __typename?: 'CommonError', message: string } | { __typename?: 'Community', id: string, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: any, community?: { __typename?: 'Community', id: string, title: string, picture: string } | null, postedBy?: { __typename?: 'User', id: string, name: string, picture: string } | null, bookmarkedBy?: Array<{ __typename?: 'User', id: string } | null> | null, votes: Array<{ __typename?: 'Vote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null>, comments?: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, user?: { __typename?: 'User', id: string, name: string, picture: string } | null, votes?: Array<{ __typename?: 'CommentVote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null> | null } | null> | null } | null> | null } };


export const FetchCommunityPostsDocument = gql`
    query FetchCommunityPosts($name: String!) {
  fetchCommunity(name: $name) {
    ... on CommonError {
      message
    }
    ... on Community {
      id
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
}
    `;

/**
 * __useFetchCommunityPostsQuery__
 *
 * To run a query within a React component, call `useFetchCommunityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCommunityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCommunityPostsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFetchCommunityPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchCommunityPostsQuery, FetchCommunityPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCommunityPostsQuery, FetchCommunityPostsQueryVariables>(FetchCommunityPostsDocument, options);
      }
export function useFetchCommunityPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCommunityPostsQuery, FetchCommunityPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCommunityPostsQuery, FetchCommunityPostsQueryVariables>(FetchCommunityPostsDocument, options);
        }
export type FetchCommunityPostsQueryHookResult = ReturnType<typeof useFetchCommunityPostsQuery>;
export type FetchCommunityPostsLazyQueryHookResult = ReturnType<typeof useFetchCommunityPostsLazyQuery>;
export type FetchCommunityPostsQueryResult = Apollo.QueryResult<FetchCommunityPostsQuery, FetchCommunityPostsQueryVariables>;