import { Stack } from '@mantine/core';

import { RemoveVoteCacheUpdateParams, VoteCacheUpdateParams } from 'types';
import { Post, EmptyPlaceholder, PostsSkeleton, PostVotes } from 'components';
import {
  FetchCommunityPostsDocument,
  FetchCommunityPostsQuery,
  FetchCommunityPostsQueryVariables,
  useFetchCommunityPosts,
} from 'operations';

type Props = {
  title: string;
};

function updateCacheOnRemove({
  cache,
  deletedVoteId,
  postId,
  communityName,
}: RemoveVoteCacheUpdateParams) {
  const community = cache.readQuery<
    FetchCommunityPostsQuery,
    FetchCommunityPostsQueryVariables
  >({
    query: FetchCommunityPostsDocument,
    variables: { name: communityName },
  });

  if (
    community &&
    community?.fetchCommunity &&
    community.fetchCommunity.__typename === 'Community'
  ) {
    cache.writeQuery<
      FetchCommunityPostsQuery,
      FetchCommunityPostsQueryVariables
    >({
      query: FetchCommunityPostsDocument,
      variables: { name: communityName },
      data: {
        fetchCommunity: {
          ...community.fetchCommunity,
          posts: community.fetchCommunity.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                votes: post.votes.filter((vote) => vote.id !== deletedVoteId),
              };
            }
            return post;
          }),
        },
      },
    });

    return;
  }

  if (
    community &&
    community?.fetchCommunity &&
    community.fetchCommunity.__typename === 'CommonError'
  ) {
    throw new Error(community.fetchCommunity.message);
  }

  throw new Error();
}

function updateCacheOnVote({
  cache,
  communityName,
  newVote,
  postId,
}: VoteCacheUpdateParams) {
  const community = cache.readQuery<
    FetchCommunityPostsQuery,
    FetchCommunityPostsQueryVariables
  >({
    query: FetchCommunityPostsDocument,
    variables: { name: communityName },
  });

  if (
    community &&
    community?.fetchCommunity &&
    community.fetchCommunity.__typename === 'Community'
  ) {
    const isVoteExist = !!community.fetchCommunity.posts.find((post) => {
      if (post.id === postId) {
        const checkVotes = post.votes.find((vote) => vote.id === newVote.id);

        return !!checkVotes;
      }

      return false;
    });

    if (!isVoteExist) {
      cache.writeQuery<
        FetchCommunityPostsQuery,
        FetchCommunityPostsQueryVariables
      >({
        query: FetchCommunityPostsDocument,
        variables: { name: communityName },
        data: {
          fetchCommunity: {
            ...community.fetchCommunity,
            posts: community.fetchCommunity.posts.map((post) => {
              if (post.id === postId) {
                return { ...post, votes: post.votes.concat(newVote) };
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
    community &&
    community?.fetchCommunity &&
    community.fetchCommunity.__typename === 'CommonError'
  ) {
    throw new Error(community.fetchCommunity.message);
  }

  throw new Error();
}

function CommunityPosts({ title }: Props) {
  const { posts, state } = useFetchCommunityPosts({ title });

  if (state === 'ERROR') {
    return null;
  }

  if (state === 'LOADING') {
    return <PostsSkeleton />;
  }

  return (
    <Stack>
      {!posts.length ? (
        <EmptyPlaceholder message="No Posts Yet" height={300} />
      ) : (
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              list={true}
              votes={
                <PostVotes
                  data={{
                    votes: post.votes,
                    postId: post.id,
                    communityId: post.community.id,
                    communityName: post.community.title,
                    updateCacheOnRemove,
                    updateCacheOnVote,
                  }}
                />
              }
            />
          );
        })
      )}
    </Stack>
  );
}

export default CommunityPosts;
