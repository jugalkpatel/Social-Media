import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VoteCommentMutationVariables = Types.Exact<{
  type: Types.VoteType;
  commentId: Types.Scalars['String'];
}>;


export type VoteCommentMutation = { __typename?: 'Mutation', voteComment: { __typename?: 'CommentVote', id: string, type: Types.VoteType, createdAt: any, votedBy?: { __typename?: 'User', id: string } | null } | { __typename?: 'CommonError', message: string } };


export const VoteCommentDocument = gql`
    mutation VoteComment($type: VoteType!, $commentId: String!) {
  voteComment(type: $type, commentId: $commentId) {
    ... on CommonError {
      message
    }
    ... on CommentVote {
      id
      type
      createdAt
      votedBy {
        id
      }
    }
  }
}
    `;
export type VoteCommentMutationFn = Apollo.MutationFunction<VoteCommentMutation, VoteCommentMutationVariables>;

/**
 * __useVoteCommentMutation__
 *
 * To run a mutation, you first call `useVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCommentMutation, { data, loading, error }] = useVoteCommentMutation({
 *   variables: {
 *      type: // value for 'type'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useVoteCommentMutation(baseOptions?: Apollo.MutationHookOptions<VoteCommentMutation, VoteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(VoteCommentDocument, options);
      }
export type VoteCommentMutationHookResult = ReturnType<typeof useVoteCommentMutation>;
export type VoteCommentMutationResult = Apollo.MutationResult<VoteCommentMutation>;
export type VoteCommentMutationOptions = Apollo.BaseMutationOptions<VoteCommentMutation, VoteCommentMutationVariables>;