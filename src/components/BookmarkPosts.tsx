import { nanoid } from 'nanoid';
import { Stack, Title } from '@mantine/core';

import { RemoveVoteCacheUpdateParams, VoteCacheUpdateParams } from 'types';
import {
  FetchUserBookmarksDocument,
  FetchUserBookmarksQuery,
  FetchUserBookmarksQueryVariables,
  useFetchUserBookmarks,
} from 'operations';
import {
  PostsSkeleton,
  EmptyPlaceholder,
  ObserveScroll,
  Post,
  PostVotes,
} from 'components';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';

function BookmarkPosts() {
  const { posts, state, fetchMorePosts } = useFetchUserBookmarks();

  return (
    <Stack py="xl">
      <Title order={1}>Bookmarks</Title>

      {state === 'LOADING' ? <PostsSkeleton /> : null}

      {state === 'ERROR' ? (
        <EmptyPlaceholder message="there are not bookmarked posts" />
      ) : null}

      {state === 'DATA' ? (
        <Stack>
          {posts.map((post, index) => {
            return (
              <div key={nanoid()}>
                {index === posts.length - 1 ? (
                  <ObserveScroll fetchMorePosts={fetchMorePosts} />
                ) : null}
                <Post
                  post={post}
                  list={true}
                  votes={
                    <PostVotes
                      data={{
                        communityId: post.community.id,
                        communityName: post.community.title,
                        votes: post.votes,
                        postId: post.id,
                        updateCacheOnVote,
                        updateCacheOnRemove,
                      }}
                    />
                  }
                />
              </div>
            );
          })}
        </Stack>
      ) : null}
    </Stack>
  );
}

function updateCacheOnVote({ cache, postId, newVote }: VoteCacheUpdateParams) {
  const data = cache.readQuery<
    FetchUserBookmarksQuery,
    FetchUserBookmarksQueryVariables
  >({
    query: FetchUserBookmarksDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchUserBookmarks.message);
  }

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchUserBookmarks;

    const isVoteExist = !!posts.find((post) => {
      if (post.id === postId) {
        const checkVote = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVote;
      }
      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<
        FetchUserBookmarksQuery,
        FetchUserBookmarksQueryVariables
      >({
        query: FetchUserBookmarksDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchUserBookmarks: {
            ...data.fetchUserBookmarks,
            posts: posts.map((post) => {
              if (post.id === postId) {
                const updatedVotes = post.votes.concat(newVote);

                return { ...post, votes: updatedVotes };
              }

              return post;
            }),
          },
        },
      });
    }

    return;
  }
}

function updateCacheOnRemove({
  cache,
  deletedVoteId,
  postId,
}: RemoveVoteCacheUpdateParams) {
  const data = cache.readQuery<
    FetchUserBookmarksQuery,
    FetchUserBookmarksQueryVariables
  >({
    query: FetchUserBookmarksDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchUserBookmarks.message);
  }

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchUserBookmarks;
    cache.writeQuery<FetchUserBookmarksQuery, FetchUserBookmarksQueryVariables>(
      {
        query: FetchUserBookmarksDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchUserBookmarks: {
            ...data.fetchUserBookmarks,
            posts: posts.map((post) => {
              if (post.id === postId) {
                const updatedVotes = post.votes.filter(
                  ({ id }) => id !== deletedVoteId,
                );

                return { ...post, votes: updatedVotes };
              }

              return post;
            }),
          },
        },
      },
    );

    return;
  }

  throw new Error();
}

export default BookmarkPosts;
