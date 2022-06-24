import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveVoteMutationVariables = Types.Exact<{
  postId: Types.Scalars['String'];
  voteId: Types.Scalars['String'];
  communityId: Types.Scalars['String'];
}>;


export type RemoveVoteMutation = { __typename?: 'Mutation', removeVote: { __typename?: 'CommonError', message: string } | { __typename?: 'Vote', id: string } };


export const RemoveVoteDocument = gql`
    mutation RemoveVote($postId: String!, $voteId: String!, $communityId: String!) {
  removeVote(postId: $postId, voteId: $voteId, communityId: $communityId) {
    ... on CommonError {
      message
    }
    ... on Vote {
      id
    }
  }
}
    `;
export type RemoveVoteMutationFn = Apollo.MutationFunction<RemoveVoteMutation, RemoveVoteMutationVariables>;

/**
 * __useRemoveVoteMutation__
 *
 * To run a mutation, you first call `useRemoveVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVoteMutation, { data, loading, error }] = useRemoveVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      voteId: // value for 'voteId'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useRemoveVoteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveVoteMutation, RemoveVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveVoteMutation, RemoveVoteMutationVariables>(RemoveVoteDocument, options);
      }
export type RemoveVoteMutationHookResult = ReturnType<typeof useRemoveVoteMutation>;
export type RemoveVoteMutationResult = Apollo.MutationResult<RemoveVoteMutation>;
export type RemoveVoteMutationOptions = Apollo.BaseMutationOptions<RemoveVoteMutation, RemoveVoteMutationVariables>;