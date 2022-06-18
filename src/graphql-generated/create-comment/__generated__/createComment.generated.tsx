import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCommentMutationVariables = Types.Exact<{
  postId: Types.Scalars['String'];
  text: Types.Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'IPostUser', id: string, name: string, picture: string }, post: { __typename?: 'PostWithId', id: string }, votes?: Array<{ __typename?: 'ICommonVote', id: string, type: Types.VoteType, votedBy: { __typename?: 'IUserWithID', id: string } } | null> | null } | { __typename?: 'CommentError', message: string } };


export const CreateCommentDocument = gql`
    mutation CreateComment($postId: String!, $text: String!) {
  createComment(postId: $postId, text: $text) {
    ... on Comment {
      id
      text
      user {
        id
        name
        picture
      }
      createdAt
      updatedAt
      post {
        id
      }
      votes {
        id
        type
        votedBy {
          id
        }
      }
    }
    ... on CommentError {
      message
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;