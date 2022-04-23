import { InMemoryCache, makeVar } from '@apollo/client';
import { getAuthCredentialsFromLocalStorage } from 'lib';
import { CommunityVar } from 'types';

type UserCredentials = {
  isLoggedIn: boolean;
  id: string;
  name: string;
  token: string;
};

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return authorizationVar();
          },
        },
        id: {
          read() {
            return userIdVar();
          },
        },
        name: {
          read() {
            return userNameVar();
          },
        },
        token: {
          read() {
            return tokenVar();
          },
        },
      },
    },
    Community: {
      fields: {
        communities: {
          read() {
            return communityVar();
          },
        },
      },
    },
  },
});

function getUserCredentials(): UserCredentials {
  const authCredentials = getAuthCredentialsFromLocalStorage();

  if (!authCredentials) {
    return { isLoggedIn: false, id: '', name: '', token: '' };
  }

  const { id, name, token } = authCredentials;

  return {
    id: id || '',
    isLoggedIn: !!token || false,
    name: name || '',
    token: token || '',
  };
}

const { id, isLoggedIn, name, token } = getUserCredentials();

export const authorizationVar = makeVar<boolean>(isLoggedIn);

export const userIdVar = makeVar<string>(id);

export const userNameVar = makeVar<string>(name);

export const tokenVar = makeVar<string>(token);

export const communityVar = makeVar<CommunityVar>([]);

export function setAuthCredentials({
  isLoggedIn,
  id,
  name,
  token,
}: UserCredentials): void {
  authorizationVar(isLoggedIn);

  userIdVar(id);

  userNameVar(name);

  tokenVar(token);
}
