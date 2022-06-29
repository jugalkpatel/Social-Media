import { Stack } from '@mantine/core';
import { nanoid } from 'nanoid';

import { VoteCacheUpdateParams, RemoveVoteCacheUpdateParams } from 'types';
import {
  FetchAllUserPostsByTimeDocument,
  FetchAllUserPostsByTimeQuery,
  FetchAllUserPostsByTimeQueryVariables,
  useNewUserPosts,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';
import {
  Post,
  PostVotes,
  PostsSkeleton,
  EmptyPlaceholder,
  ObserveScroll,
} from 'components';

function PersonalisedNewPosts() {
  const { posts, state, fetchMorePosts } = useNewUserPosts();

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
    FetchAllUserPostsByTimeQuery,
    FetchAllUserPostsByTimeQueryVariables
  >({
    query: FetchAllUserPostsByTimeDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllUserPostsByTime &&
    data.fetchAllUserPostsByTime.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllUserPostsByTime.message);
  }

  if (
    data &&
    data?.fetchAllUserPostsByTime &&
    data.fetchAllUserPostsByTime.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllUserPostsByTime;

    const isVoteExist = !!posts.find((post) => {
      if (post.id === postId) {
        const checkVote = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVote;
      }
      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<
        FetchAllUserPostsByTimeQuery,
        FetchAllUserPostsByTimeQueryVariables
      >({
        query: FetchAllUserPostsByTimeDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllUserPostsByTime: {
            ...data.fetchAllUserPostsByTime,
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
    FetchAllUserPostsByTimeQuery,
    FetchAllUserPostsByTimeQueryVariables
  >({
    query: FetchAllUserPostsByTimeDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllUserPostsByTime &&
    data.fetchAllUserPostsByTime.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllUserPostsByTime.message);
  }

  if (
    data &&
    data?.fetchAllUserPostsByTime &&
    data.fetchAllUserPostsByTime.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllUserPostsByTime;

    if (posts && posts.length) {
      cache.writeQuery<
        FetchAllUserPostsByTimeQuery,
        FetchAllUserPostsByTimeQueryVariables
      >({
        query: FetchAllUserPostsByTimeDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllUserPostsByTime: {
            ...data.fetchAllUserPostsByTime,
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

export default PersonalisedNewPosts;
