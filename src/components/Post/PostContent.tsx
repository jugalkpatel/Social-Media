import { nanoid } from 'nanoid';
import { Stack } from '@mantine/core';

import { RemoveVoteCacheUpdateParams, VoteCacheUpdateParams } from 'types';
import {
  PostSkeleton,
  PostNotFound,
  Post,
  CommentSkeleton,
  PostComments,
  PostVotes,
} from 'components';
import {
  FetchPostDocument,
  FetchPostQuery,
  FetchPostQueryVariables,
  useFetchPost,
} from 'operations';

type Props = {
  postId: string;
};

function updateCacheOnRemove({
  cache,
  deletedVoteId,
  postId,
}: RemoveVoteCacheUpdateParams): void {
  const post = cache.readQuery<FetchPostQuery, FetchPostQueryVariables>({
    query: FetchPostDocument,
    variables: { postId },
  });

  if (post && post?.fetchPost && post.fetchPost.__typename === 'Post') {
    cache.writeQuery<FetchPostQuery, FetchPostQueryVariables>({
      query: FetchPostDocument,
      variables: { postId },
      data: {
        fetchPost: {
          ...post.fetchPost,
          votes: post.fetchPost.votes.filter(({ id }) => id !== deletedVoteId),
        },
      },
    });

    return;
  }

  if (post && post?.fetchPost && post.fetchPost.__typename === 'CommonError') {
    throw new Error(post.fetchPost.message);
  }

  throw new Error();
}

function updateCacheOnVote({ cache, newVote, postId }: VoteCacheUpdateParams) {
  const post = cache.readQuery<FetchPostQuery, FetchPostQueryVariables>({
    query: FetchPostDocument,
    variables: { postId },
  });

  if (post && post?.fetchPost && post.fetchPost.__typename === 'Post') {
    const isVoteExist = post.fetchPost.votes.find(
      ({ id }) => id === newVote.id,
    );

    if (!isVoteExist) {
      cache.writeQuery<FetchPostQuery, FetchPostQueryVariables>({
        query: FetchPostDocument,
        variables: { postId },
        data: {
          fetchPost: {
            ...post.fetchPost,
            votes: post.fetchPost.votes.concat(newVote),
          },
        },
      });
    }

    return;
  }

  if (post && post?.fetchPost && post.fetchPost.__typename == 'CommonError') {
    throw new Error(post.fetchPost.message);
  }

  throw new Error();
}

function PostContent({ postId }: Props) {
  const { post, state } = useFetchPost({ postId });

  if (state === 'ERROR') {
    return <PostNotFound />;
  }

  if (state === 'LOADING') {
    return (
      <Stack>
        <PostSkeleton />
        {new Array(3).fill(0).map((_) => {
          return <CommentSkeleton key={nanoid()} />;
        })}
      </Stack>
    );
  }

  return (
    <Stack>
      <Post
        post={post}
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
      <PostComments
        comments={post.comments}
        postId={post.id}
        // communityName={post.community.title}
        communityId={post.community.id}
      />
    </Stack>
  );
}

export default PostContent;
