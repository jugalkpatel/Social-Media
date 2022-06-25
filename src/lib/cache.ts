import { InMemoryCache, makeVar } from '@apollo/client';

import { BatchPosts } from 'types';

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
        fetchAllPosts: {
          keyArgs: false,
          merge(existing: BatchPosts, incoming: BatchPosts) {
            console.log({ existing });
            console.log({ incoming });

            const exisingPosts =
              existing && existing?.posts ? existing.posts : [];

            const incomingPosts =
              incoming && incoming?.posts ? incoming.posts : [];

            const newPosts: BatchPosts = {
              __typename: incoming.__typename,
              cursorId: incoming.cursorId,
              posts: [...exisingPosts, ...incomingPosts],
            };

            return newPosts;
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
