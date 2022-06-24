import { InMemoryCache, makeVar } from '@apollo/client';

type UserCredentials = {
  isLoggedIn: boolean;
  id: string;
  name: string;
  picture: string;
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
        picture: {
          read() {
            return userPictureVar();
          },
        },
      },
    },
    Post: {
      fields: {
        votes: {
          merge(existing = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
    // Community: {
    //   fields: {
    //     members: {
    //       merge(existing = [], incoming: any[]) {
    //         return [...existing, ...incoming];
    //       },
    //     },
    //   },
    // },
  },
});

export const authorizationVar = makeVar<boolean>(false);

export const userIdVar = makeVar<string>('');

export const userNameVar = makeVar<string>('');

export const userPictureVar = makeVar<string>('');

export function setAuthCredentials({
  isLoggedIn,
  id,
  name,
  picture,
}: UserCredentials): void {
  authorizationVar(isLoggedIn);

  userIdVar(id);

  userNameVar(name);

  userPictureVar(picture);
}
