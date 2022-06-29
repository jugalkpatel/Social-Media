import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveCommentVoteMutationVariables = Types.Exact<{
  commentId: Types.Scalars['String'];
  voteId: Types.Scalars['String'];
}>;


export type RemoveCommentVoteMutation = { __typename?: 'Mutation', removeCommentVote: { __typename?: 'CommentVote', id: string, type: Types.VoteType, votedBy?: { __typename?: 'User', id: string } | null } | { __typename?: 'CommonError', message: string } };


export const RemoveCommentVoteDocument = gql`
    mutation RemoveCommentVote($commentId: String!, $voteId: String!) {
  removeCommentVote(commentId: $commentId, voteId: $voteId) {
    ... on CommonError {
      message
    }
    ... on CommentVote {
      id
      type
      votedBy {
        id
      }
    }
  }
}
    `;
export type RemoveCommentVoteMutationFn = Apollo.MutationFunction<RemoveCommentVoteMutation, RemoveCommentVoteMutationVariables>;

/**
 * __useRemoveCommentVoteMutation__
 *
 * To run a mutation, you first call `useRemoveCommentVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentVoteMutation, { data, loading, error }] = useRemoveCommentVoteMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      voteId: // value for 'voteId'
 *   },
 * });
 */
export function useRemoveCommentVoteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCommentVoteMutation, RemoveCommentVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCommentVoteMutation, RemoveCommentVoteMutationVariables>(RemoveCommentVoteDocument, options);
      }
export type RemoveCommentVoteMutationHookResult = ReturnType<typeof useRemoveCommentVoteMutation>;
export type RemoveCommentVoteMutationResult = Apollo.MutationResult<RemoveCommentVoteMutation>;
export type RemoveCommentVoteMutationOptions = Apollo.BaseMutationOptions<RemoveCommentVoteMutation, RemoveCommentVoteMutationVariables>;