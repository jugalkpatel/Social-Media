import { useReactiveVar } from '@apollo/client';
import { Stack, createStyles, Divider } from '@mantine/core';

import {
  Comment as CommentType,
  VoteCommentCacheParams,
  RemoveVoteCommentCacheParams,
} from 'types';
import {
  CommentEditor,
  Comment,
  EmptyPlaceholder,
  CommentVotes,
} from 'components';
import { userIdVar } from 'lib';
import { useCheckUserInCommunity } from 'hooks';
import {
  FetchPostDocument,
  FetchPostQuery,
  FetchPostQueryVariables,
} from 'operations';

type Props = {
  postId: string;
  comments: Array<CommentType>;
  communityName: string;
};

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[6]
    }`,
    borderRadius: '0.3rem',
  },
  gray: {
    color: theme.colors.gray[4],
  },
}));

function PostComments({ comments, postId, communityName }: Props) {
  const { classes, cx } = useStyles();
  const userId = useReactiveVar(userIdVar);
  const isAuthenticated = !!userId;
  const { isUserInCommunity } = useCheckUserInCommunity({
    title: communityName,
  });

  return (
    <Stack
      className={cx(classes.background, classes.border)}
      spacing="xs"
      px="sm"
      py="xs"
    >
      {isAuthenticated && isUserInCommunity ? (
        <>
          <CommentEditor postId={postId} />
          <Divider size="xs" />
        </>
      ) : null}

      <Stack id="comments" py="sm">
        {!comments.length ? (
          <EmptyPlaceholder message="No Comments Yet" />
        ) : (
          comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                votes={
                  <CommentVotes
                    commentId={comment.id}
                    votes={comment.votes}
                    updateCacheOnVote={updateCacheOnVote}
                    communityName={communityName}
                    postId={postId}
                    updateCacheOnRemoveVote={updateCacheOnRemoveVote}
                  />
                }
              />
            );
          })
        )}
      </Stack>
    </Stack>
  );
}

function updateCacheOnVote({
  cache,
  commentId,
  newCommentVote,
  postId,
}: VoteCommentCacheParams) {
  const post = cache.readQuery<FetchPostQuery, FetchPostQueryVariables>({
    query: FetchPostDocument,
    variables: { postId },
  });

  if (post && post?.fetchPost && post.fetchPost.__typename === 'CommonError') {
    throw new Error(post.fetchPost.message);
  }

  if (post && post?.fetchPost && post.fetchPost.__typename === 'Post') {
    const isCommentExists = post.fetchPost.comments.find(
      ({ id }) => id === commentId,
    );

    if (!isCommentExists) {
      cache.writeQuery<FetchPostQuery, FetchPostQueryVariables>({
        query: FetchPostDocument,
        variables: { postId },
        data: {
          fetchPost: {
            ...post.fetchPost,
            comments: post.fetchPost.comments.map((comment) => {
              if (comment.id === commentId) {
                const votes =
                  comment?.votes && comment.votes.length
                    ? comment.votes.concat(newCommentVote)
                    : comment.votes;
                return { ...comment, votes };
              }
              return comment;
            }),
          },
        },
      });
    }

    return;
  }

  throw new Error();
}

function updateCacheOnRemoveVote({
  cache,
  commentId,
  postId,
  voteId,
}: RemoveVoteCommentCacheParams) {
  const post = cache.readQuery<FetchPostQuery, FetchPostQueryVariables>({
    query: FetchPostDocument,
    variables: { postId },
  });

  if (post && post?.fetchPost && post.fetchPost.__typename === 'CommonError') {
    throw new Error(post.fetchPost.message);
  }

  if (post && post?.fetchPost && post.fetchPost.__typename === 'Post') {
    cache.writeQuery<FetchPostQuery, FetchPostQueryVariables>({
      query: FetchPostDocument,
      variables: { postId },
      data: {
        fetchPost: {
          ...post.fetchPost,
          comments:
            post.fetchPost?.comments && post.fetchPost.comments.length
              ? post.fetchPost.comments.map((comment) => {
                  if (comment.id === commentId) {
                    const votes = comment.votes.filter(
                      ({ id }) => id !== voteId,
                    );

                    return { ...comment, votes };
                  }

                  return comment;
                })
              : post.fetchPost.comments,
        },
      },
    });

    return;
  }

  throw new Error();
}
export default PostComments;
