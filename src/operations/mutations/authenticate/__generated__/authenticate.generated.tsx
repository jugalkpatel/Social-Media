import * as Types from '../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthenticateMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'CommonError', message: string } | { __typename?: 'User', id: string, name: string, picture: string, bookmarks?: Array<{ __typename?: 'Post', id: string } | null> | null, joinedCommunities?: Array<{ __typename?: 'Community', id: string }> | null } };


export const AuthenticateDocument = gql`
    mutation Authenticate {
  authenticate {
    ... on User {
      id
      name
      picture
      bookmarks {
        id
      }
      joinedCommunities {
        id
      }
    }
    ... on CommonError {
      message
    }
  }
}
    `;
export type AuthenticateMutationFn = Apollo.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;