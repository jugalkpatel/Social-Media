import { Stack } from '@mantine/core';
import { nanoid } from 'nanoid';

import { VoteCacheUpdateParams, RemoveVoteCacheUpdateParams } from 'types';
import {
  PostsSkeleton,
  EmptyPlaceholder,
  ObserveScroll,
  Post,
  PostVotes,
} from 'components';
import {
  FetchAllUserPostsByVoteQuery,
  FetchAllUserPostsByVoteDocument,
  FetchAllUserPostsByVoteQueryVariables,
  useTopUserPosts,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';

function PersonalisedTopPosts() {
  const { posts, state, fetchMorePosts } = useTopUserPosts();

  if (state === 'LOADING') {
    return <PostsSkeleton />;
  }

  if (state === 'ERROR') {
    return <EmptyPlaceholder message="there are no posts" />;
  }

  return (
    <Stack pb="xl">
      {posts.length ? (
        posts.map((post, index) => {
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
        })
      ) : (
        <EmptyPlaceholder
          message="there are no posts. Please Join Community"
          height={300}
          noBorder={true}
        />
      )}
    </Stack>
  );
}

function updateCacheOnVote({ cache, postId, newVote }: VoteCacheUpdateParams) {
  const data = cache.readQuery<
    FetchAllUserPostsByVoteQuery,
    FetchAllUserPostsByVoteQueryVariables
  >({
    query: FetchAllUserPostsByVoteDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllUserPostsByVote &&
    data.fetchAllUserPostsByVote.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllUserPostsByVote.message);
  }

  if (
    data &&
    data?.fetchAllUserPostsByVote &&
    data.fetchAllUserPostsByVote.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllUserPostsByVote;

    const isVoteExist = !!posts.find((post) => {
      if (post.id === postId) {
        const checkVote = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVote;
      }
      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<
        FetchAllUserPostsByVoteQuery,
        FetchAllUserPostsByVoteQueryVariables
      >({
        query: FetchAllUserPostsByVoteDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllUserPostsByVote: {
            ...data.fetchAllUserPostsByVote,
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
    FetchAllUserPostsByVoteQuery,
    FetchAllUserPostsByVoteQueryVariables
  >({
    query: FetchAllUserPostsByVoteDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllUserPostsByVote &&
    data.fetchAllUserPostsByVote.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllUserPostsByVote.message);
  }

  if (
    data &&
    data?.fetchAllUserPostsByVote &&
    data.fetchAllUserPostsByVote.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllUserPostsByVote;

    if (posts && posts.length) {
      cache.writeQuery<
        FetchAllUserPostsByVoteQuery,
        FetchAllUserPostsByVoteQueryVariables
      >({
        query: FetchAllUserPostsByVoteDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllUserPostsByVote: {
            ...data.fetchAllUserPostsByVote,
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

export default PersonalisedTopPosts;
