import { useReactiveVar } from '@apollo/client';
import { Stack, createStyles, Divider } from '@mantine/core';

import { Comment as CommentType } from 'types';
import { CommentEditor, Comment, EmptyPlaceholder } from 'components';
import { userIdVar } from 'lib';
import { useCheckUserInCommunity } from 'hooks';

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
            return <Comment key={comment.id} comment={comment} />;
          })
        )}
      </Stack>
    </Stack>
  );
}

export default PostComments;
