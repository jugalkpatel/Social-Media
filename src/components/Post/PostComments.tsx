import { Stack, createStyles, Divider, Center, Text } from '@mantine/core';
import { AiOutlineComment } from 'react-icons/ai';

import { CommentEditor, Comment } from 'components';
import { useFetchPostComments } from 'operations';
import { useReactiveVar } from '@apollo/client';
import { userIdVar } from 'lib';

type Props = {
  postId: string;
};

const GRAY_COLOR = '#373A40';

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

function PostComments({ postId }: Props) {
  const { classes, cx } = useStyles();
  const userId = useReactiveVar(userIdVar);
  const isAuthenticated = !!userId;
  const { comments, state } = useFetchPostComments({ postId });

  return (
    <Stack
      className={cx(classes.background, classes.border)}
      spacing="xs"
      px="sm"
      py="xs"
    >
      {isAuthenticated ? (
        <>
          <CommentEditor />
          <Divider size="xs" variant="dotted" pt="xs" />
        </>
      ) : null}

      {!comments.length ? (
        <Center style={{ height: 200 }}>
          <Stack align="center">
            <AiOutlineComment fontSize={40} style={{ color: GRAY_COLOR }} />
            <Text size="lg" weight={700} sx={{ color: GRAY_COLOR }}>
              No Comments Yet
            </Text>
          </Stack>
        </Center>
      ) : (
        <Comment />
      )}
    </Stack>
  );
}

export default PostComments;
