import { ApolloError } from '@apollo/client';

export function isTokenExpired(error: ApolloError): boolean {
  let isExpired = false;

  if (error.graphQLErrors.length) {
    error.graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code && extensions.code === 'TOKEN_EXPIRED') {
        isExpired = true;
      }
    });
  }

  return isExpired;
}
