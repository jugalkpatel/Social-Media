import { format, setGlobalDateMasks } from 'fecha';
import { createStyles, Avatar, Group, Text, ActionIcon } from '@mantine/core';
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb';

import {
  CommentLayout,
  ReadOnlyCommentEditor,
  CommentSkeleton,
} from 'components';
import { Comment } from 'graphql-generated';
import { voteCount } from 'lib';

setGlobalDateMasks({
  commentTime: '[on] MMMM Do, YY · hh:mm A',
});

type Props = {
  comment: Comment;
};

const useStyles = createStyles((theme) => ({
  arrow: {
    color: 'grey',
    fontSize: '30px',
  },
}));

function Comment({ comment }: Props) {
  const { classes } = useStyles();
  const {
    id,
    createdAt,
    user: { name: userName, picture: userAvatar },
    votes,
    text,
  } = comment;

  console.log({ id });

  if (!id) {
    return <CommentSkeleton />;
  }

  return (
    <CommentLayout
      avatar={
        <Avatar
          size="md"
          radius="xl"
          src={userAvatar}
          sx={{ backgroundColor: '#fff' }}
        />
      }
      info={
        <Group noWrap={true} spacing={5}>
          <Text weight={700} size="xs">
            {userName}
          </Text>

          <Text size="xs">·</Text>

          <Text size="xs" color="gray">
            {format(new Date(createdAt), 'commentTime')}
          </Text>
        </Group>
      }
      main={<ReadOnlyCommentEditor content={text} />}
      votes={
        <Group align="center" noWrap={true} spacing={4}>
          <ActionIcon variant="transparent" size="sm">
            <TbArrowBigTop className={classes.arrow} />
          </ActionIcon>

          <Text weight={700} size="sm" color="gray">
            {voteCount(votes)}
          </Text>

          <ActionIcon size="sm">
            <TbArrowBigDown className={classes.arrow} />
          </ActionIcon>
        </Group>
      }
    />
  );
}

export default Comment;
