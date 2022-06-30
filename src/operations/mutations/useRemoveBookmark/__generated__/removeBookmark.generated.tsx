import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveBookmarkMutationVariables = Types.Exact<{
  postId: Types.Scalars['String'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark: { __typename?: 'CommonError', message: string } | { __typename?: 'Post', id: string, title: string, content: string, createdAt: any, community?: { __typename?: 'Community', id: string, title: string, picture: string } | null, postedBy?: { __typename?: 'User', id: string, name: string, picture: string } | null, bookmarkedBy?: Array<{ __typename?: 'User', id: string } | null> | null, votes: Array<{ __typename?: 'Vote', id: string, type: Types.VoteType, voteUser?: { __typename?: 'User', id: string } | null } | null>, comments?: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, user?: { __typename?: 'User', id: string, name: string, picture: string } | null, votes?: Array<{ __typename?: 'CommentVote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | null> | null } | null> | null } };


export const RemoveBookmarkDocument = gql`
    mutation RemoveBookmark($postId: String!) {
  removeBookmark(postId: $postId) {
    ... on CommonError {
      message
    }
    ... on Post {
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
}
    `;
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;

/**
 * __useRemoveBookmarkMutation__
 *
 * To run a mutation, you first call `useRemoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookmarkMutation, { data, loading, error }] = useRemoveBookmarkMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>(RemoveBookmarkDocument, options);
      }
export type RemoveBookmarkMutationHookResult = ReturnType<typeof useRemoveBookmarkMutation>;
export type RemoveBookmarkMutationResult = Apollo.MutationResult<RemoveBookmarkMutation>;
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;