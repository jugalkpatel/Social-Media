import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Stack } from '@mantine/core';
import { nanoid } from 'nanoid';

import {
  RemoveVoteCacheUpdateParams,
  VoteCacheUpdateParams,
  FILTER,
} from 'types';
import {
  PostsSkeleton,
  EmptyPlaceholder,
  Post,
  PostVotes,
  Filters,
} from 'components';
import {
  usePopularPosts,
  FetchAllPostsQuery,
  FetchAllPostsDocument,
  FetchAllPostsQueryVariables,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME, topFilter, timeFilter } from 'lib';

function Observer({ fetchMorePosts }: { fetchMorePosts: () => Promise<void> }) {
  const { ref, inView } = useInView();

  console.log({ inView, ref });

  useEffect(() => {
    if (inView) {
      (async () => {
        await fetchMorePosts();
      })();
    }
  }, [inView]);

  return <span ref={ref}></span>;
}

function Popular() {
  const {
    posts: postsData,
    state,
    fetchMorePosts,
    morePostsLoading,
  } = usePopularPosts();
  const [filter, setFilter] = useState<FILTER>('NEW');

  if (state === 'LOADING') {
    return <PostsSkeleton />;
  }

  if (state === 'ERROR') {
    return <EmptyPlaceholder message="there are not posts" />;
  }

  console.log({ filter });
  const posts =
    filter === 'TOP'
      ? topFilter(postsData)
      : filter === 'NEW'
      ? timeFilter(postsData)
      : postsData;
  // const timedPosts = timeFilter(postsData);

  return (
    <Stack pb="xl">
      <Filters value={filter} setValue={setFilter} />
      {posts.map((post, index) => {
        return (
          <div key={nanoid()}>
            {index === posts.length - 1 ? (
              <Observer fetchMorePosts={fetchMorePosts} />
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
      })}

      {morePostsLoading ? <PostsSkeleton /> : null}
    </Stack>
  );
}

function updateCacheOnVote({ cache, postId, newVote }: VoteCacheUpdateParams) {
  const data = cache.readQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(
    {
      query: FetchAllPostsDocument,
      variables: { take: NO_OF_POSTS_AT_A_TIME },
    },
  );

  if (
    data &&
    data?.fetchAllPosts &&
    data.fetchAllPosts.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllPosts;

    const isVoteExist = !!posts.find((post) => {
      if (post.id === postId) {
        const checkVote = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVote;
      }
      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>({
        query: FetchAllPostsDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllPosts: {
            ...data.fetchAllPosts,
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
    data?.fetchAllPosts &&
    data.fetchAllPosts.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllPosts.message);
  }
}

function updateCacheOnRemove({
  cache,
  deletedVoteId,
  postId,
}: RemoveVoteCacheUpdateParams) {
  const data = cache.readQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(
    {
      query: FetchAllPostsDocument,
      variables: { take: NO_OF_POSTS_AT_A_TIME },
    },
  );

  if (
    data &&
    data?.fetchAllPosts &&
    data.fetchAllPosts.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchAllPosts.message);
  }

  if (
    data &&
    data?.fetchAllPosts &&
    data.fetchAllPosts.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchAllPosts;

    if (posts.length) {
      cache.writeQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>({
        query: FetchAllPostsDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchAllPosts: {
            ...data.fetchAllPosts,
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

export default Popular;
