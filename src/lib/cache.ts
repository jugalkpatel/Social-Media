import { InMemoryCache, makeVar } from '@apollo/client';
import { CommunityVar } from 'types';

type UserCredentials = {
  isLoggedIn: boolean;
  id: string;
  name: string;
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

export const authorizationVar = makeVar<boolean>(false);

export const userIdVar = makeVar<string>('');

export const userNameVar = makeVar<string>('');

export const communityVar = makeVar<CommunityVar>([]);

export function setAuthCredentials({
  isLoggedIn,
  id,
  name,
}: UserCredentials): void {
  authorizationVar(isLoggedIn);

  userIdVar(id);

  userNameVar(name);
}
