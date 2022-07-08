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

export function isTokenIncluded(error: ApolloError): boolean {
  let isTokenIncluded = false;

  if (error.graphQLErrors.length) {
    error.graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code && extensions.code !== 'UNAUTHENTICATED') {
        isTokenIncluded = true;
      }
    });
  }

  return isTokenIncluded;
}
