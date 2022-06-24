import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchAllPostsQueryVariables = Types.Exact<{
  take: Types.Scalars['Int'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  cursorId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type FetchAllPostsQuery = { __typename?: 'Query', fetchAllPosts: { __typename?: 'BatchPosts', cursorId: string, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: any, community?: { __typename?: 'Community', id: string, title: string, picture: string } | null, postedBy?: { __typename?: 'User', id: string, name: string, picture: string } | null, bookmarkedBy?: Array<{ __typename?: 'User', id: string } | null> | null, votes: Array<{ __typename?: 'Vote', id: string, type: Types.VoteType, voteUser?: { __typename?: 'User', id: string } | null } | null>, comments?: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, user?: { __typename?: 'User', id: string, name: string, picture: string } | null, votes?: Array<{ __typename?: 'CommentVote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null> | null } | null> | null } | null> | null } | { __typename?: 'CommonError', message: string } };


export const FetchAllPostsDocument = gql`
    query FetchAllPosts($take: Int!, $skip: Int, $cursorId: String) {
  fetchAllPosts(take: $take, skip: $skip, cursorId: $cursorId) {
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
 * __useFetchAllPostsQuery__
 *
 * To run a query within a React component, call `useFetchAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllPostsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      cursorId: // value for 'cursorId'
 *   },
 * });
 */
export function useFetchAllPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllPostsQuery, FetchAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(FetchAllPostsDocument, options);
      }
export function useFetchAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllPostsQuery, FetchAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(FetchAllPostsDocument, options);
        }
export type FetchAllPostsQueryHookResult = ReturnType<typeof useFetchAllPostsQuery>;
export type FetchAllPostsLazyQueryHookResult = ReturnType<typeof useFetchAllPostsLazyQuery>;
export type FetchAllPostsQueryResult = Apollo.QueryResult<FetchAllPostsQuery, FetchAllPostsQueryVariables>;