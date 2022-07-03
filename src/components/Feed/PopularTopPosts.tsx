import { Stack } from '@mantine/core';
import { nanoid } from 'nanoid';

import {
  ObserveScroll,
  PostsSkeleton,
  EmptyPlaceholder,
  Post,
  PostVotes,
} from 'components';
import {
  FetchAllPostsByVotesDocument,
  FetchAllPostsByVotesQuery,
  FetchAllPostsByVotesQueryVariables,
  useTopPopularPosts,
} from 'operations';
import { VoteCacheUpdateParams, RemoveVoteCacheUpdateParams } from 'types';
import { NO_OF_POSTS_AT_A_TIME } from 'lib';

function PopularTopPosts() {
  const { posts, state, fetchMorePosts } = useTopPopularPosts();

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
                      updateCacheOnRemove,
                      updateCacheOnVote,
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
    FetchAllPostsByVotesQuery,
    FetchAllPostsByVotesQueryVariables
  >({
    query: FetchAllPostsByVotesDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllPostsByVotes &&
    data.fetchAllPostsByVotes.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllPostsByVotes;

    const isVoteExist = !!posts.find((post) => {
      if (post.id === postId) {
        const checkVote = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVote;
      }
      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<
        FetchAllPostsByVotesQuery,
        FetchAllPostsByVotesQueryVariables
      >({
        query: FetchAllPostsByVotesDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllPostsByVotes: {
            ...data.fetchAllPostsByVotes,
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
    data?.fetchAllPostsByVotes &&
    data.fetchAllPostsByVotes.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllPostsByVotes.message);
  }
}

function updateCacheOnRemove({
  cache,
  deletedVoteId,
  postId,
}: RemoveVoteCacheUpdateParams) {
  const data = cache.readQuery<
    FetchAllPostsByVotesQuery,
    FetchAllPostsByVotesQueryVariables
  >({
    query: FetchAllPostsByVotesDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchAllPostsByVotes &&
    data.fetchAllPostsByVotes.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllPostsByVotes.message);
  }

  if (
    data &&
    data?.fetchAllPostsByVotes &&
    data.fetchAllPostsByVotes.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllPostsByVotes;
    if (posts.length) {
      cache.writeQuery<
        FetchAllPostsByVotesQuery,
        FetchAllPostsByVotesQueryVariables
      >({
        query: FetchAllPostsByVotesDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllPostsByVotes: {
            ...data.fetchAllPostsByVotes,
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

export default PopularTopPosts;

//   fetchAllPosts: {
//     ...data.fetchAllPosts,
//     posts: posts.map((post) => {
//       if (post.id === postId) {
//         const updatedVotes = post.votes.concat(newVote);

//         return { ...post, votes: updatedVotes };
//       }

//       return post;
//     }),
