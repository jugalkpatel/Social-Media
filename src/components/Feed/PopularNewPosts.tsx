import { Stack } from '@mantine/core';
import { nanoid } from 'nanoid';

import { VoteCacheUpdateParams, RemoveVoteCacheUpdateParams } from 'types';
import {
  ObserveScroll,
  PostsSkeleton,
  EmptyPlaceholder,
  Post,
  PostVotes,
} from 'components';
import {
  useNewPopularPosts,
  FetchAllPostsByTimeQuery,
  FetchAllPostsByTimeQueryVariables,
  FetchAllPostsByTimeDocument,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';

function PopularNewPosts() {
  const { posts, state, fetchMorePosts } = useNewPopularPosts();

  if (state === 'LOADING') {
    return <PostsSkeleton />;
  }

  if (state === 'ERROR') {
    return <EmptyPlaceholder message="there are no posts" />;
  }

  return (
    <Stack pb="xl">
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
  );
}

function updateCacheOnVote({ cache, postId, newVote }: VoteCacheUpdateParams) {
  const data = cache.readQuery<
    FetchAllPostsByTimeQuery,
    FetchAllPostsByTimeQueryVariables
  >({
    query: FetchAllPostsByTimeDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllPostsByTime &&
    data.fetchAllPostsByTime.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllPostsByTime;

    const isVoteExist = !!posts.find((post) => {
      if (post.id === postId) {
        const checkVote = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVote;
      }
      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<
        FetchAllPostsByTimeQuery,
        FetchAllPostsByTimeQueryVariables
      >({
        query: FetchAllPostsByTimeDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllPostsByTime: {
            ...data.fetchAllPostsByTime,
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

  if (
    data &&
    data?.fetchAllPostsByTime &&
    data.fetchAllPostsByTime.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllPostsByTime.message);
  }
}

function updateCacheOnRemove({
  cache,
  deletedVoteId,
  postId,
}: RemoveVoteCacheUpdateParams) {
  const data = cache.readQuery<
    FetchAllPostsByTimeQuery,
    FetchAllPostsByTimeQueryVariables
  >({
    query: FetchAllPostsByTimeDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllPostsByTime &&
    data.fetchAllPostsByTime.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllPostsByTime.message);
  }

  if (
    data &&
    data?.fetchAllPostsByTime &&
    data.fetchAllPostsByTime.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllPostsByTime;

    if (posts.length) {
      cache.writeQuery<
        FetchAllPostsByTimeQuery,
        FetchAllPostsByTimeQueryVariables
      >({
        query: FetchAllPostsByTimeDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllPostsByTime: {
            ...data.fetchAllPostsByTime,
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
      });

      return;
    }

    throw new Error();
  }

  throw new Error();
}

export default PopularNewPosts;
