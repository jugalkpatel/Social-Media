import { InMemoryCache, makeVar } from '@apollo/client';

import { BatchPosts, Bookmark } from 'types';

type UserCredentials = {
  isLoggedIn: boolean;
  id: string;
  name: string;
  picture: string;
  bookmarks: Array<Bookmark>;
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
        bookmarks: {
          read() {
            return userBookmarksVar();
          },
        },
        fetchAllPostsByVotes: {
          keyArgs: false,
          merge(existing: BatchPosts, incoming: BatchPosts) {
            const exisingPosts =
              existing && existing?.posts ? existing.posts : [];

            const incomingPosts =
              incoming && incoming?.posts ? incoming.posts : [];

            const newPosts: BatchPosts = {
              __typename: incoming.__typename,
              cursorId: incoming.cursorId,
              posts: [...new Set([...exisingPosts, ...incomingPosts])],
            };

            return newPosts;
          },
        },
        fetchAllPostsByTime: {
          keyArgs: false,
          merge(existing: BatchPosts, incoming: BatchPosts) {
            const exisingPosts =
              existing && existing?.posts ? existing.posts : [];

            const incomingPosts =
              incoming && incoming?.posts ? incoming.posts : [];

            const newPosts: BatchPosts = {
              __typename: incoming.__typename,
              cursorId: incoming.cursorId,
              posts: [...new Set([...exisingPosts, ...incomingPosts])],
            };

            return newPosts;
          },
        },
        fetchAllUserPostsByTime: {
          keyArgs: false,
          merge(existing: BatchPosts, incoming: BatchPosts) {
            const exisingPosts =
              existing && existing?.posts ? existing.posts : [];

            const incomingPosts =
              incoming && incoming?.posts ? incoming.posts : [];

            const newPosts: BatchPosts = {
              __typename: incoming.__typename,
              cursorId: incoming.cursorId,
              posts: [...new Set([...exisingPosts, ...incomingPosts])],
            };

            return newPosts;
          },
        },
        fetchAllUserPostsByVote: {
          keyArgs: false,
          merge(existing: BatchPosts, incoming: BatchPosts) {
            const exisingPosts =
              existing && existing?.posts ? existing.posts : [];

            const incomingPosts =
              incoming && incoming?.posts ? incoming.posts : [];

            const newPosts: BatchPosts = {
              __typename: incoming.__typename,
              cursorId: incoming.cursorId,
              posts: [...new Set([...exisingPosts, ...incomingPosts])],
            };

            return newPosts;
          },
        },
        fetchUserBookmarks: {
          keyArgs: false,
          merge(existing: BatchPosts, incoming: BatchPosts) {
            const exisingPosts =
              existing && existing?.posts ? existing.posts : [];

            const incomingPosts =
              incoming && incoming?.posts ? incoming.posts : [];

            const newPosts: BatchPosts = {
              __typename: incoming.__typename,
              cursorId: incoming.cursorId,
              posts: [...new Set([...exisingPosts, ...incomingPosts])],
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
        bookmarkedBy: {
          merge(exising = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
    Comment: {
      fields: {
        votes: {
          merge(exising = [], incoming: any[]) {
            return incoming;
          },
        },
      },
    },
  },
});

export const authorizationVar = makeVar<boolean>(false);

export const userIdVar = makeVar<string>('');

export const userNameVar = makeVar<string>('');

export const userPictureVar = makeVar<string>('');

export const userBookmarksVar = makeVar<Array<Bookmark>>([]);

export function setAuthCredentials({
  isLoggedIn,
  id,
  name,
  picture,
  bookmarks,
}: UserCredentials): void {
  authorizationVar(isLoggedIn);

  userIdVar(id);

  userNameVar(name);

  userPictureVar(picture);

  userBookmarksVar(bookmarks);
}
