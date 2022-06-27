import { format, setGlobalDateMasks } from 'fecha';
import { Avatar, Group, Text } from '@mantine/core';

import { Comment } from 'types';
import {
  CommentLayout,
  ReadOnlyCommentEditor,
  CommentSkeleton,
} from 'components';

setGlobalDateMasks({
  commentTime: '[on] MMMM Do, YY · hh:mm A',
});

type Props = {
  comment: Comment;
  votes: React.ReactNode;
};

function Comment({ comment, votes: VotesComponent }: Props) {
  const {
    id,
    createdAt,
    user: { name: userName, picture: userAvatar },
    votes,
    text,
  } = comment;

  if (!id) {
    return <CommentSkeleton />;
  }

  return (
    <CommentLayout
      avatar={
        <Avatar
          size="sm"
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
            {format(new Date(createdAt), 'timeFormat')}
          </Text>
        </Group>
      }
      main={<ReadOnlyCommentEditor content={text} />}
      votes={
        <Group align="center" noWrap={true} spacing={4}>
          {VotesComponent}
        </Group>
      }
    />
  );
}

export default Comment;
