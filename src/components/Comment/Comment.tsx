import { format, setGlobalDateMasks } from 'fecha';
import { createStyles, Avatar, Group, Text, ActionIcon } from '@mantine/core';
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb';

import { CommentLayout, ReadOnlyCommentEditor } from 'components';

setGlobalDateMasks({
  commentTime: '[on] MMMM Do, YY · hh:mm A',
});

const useStyles = createStyles((theme) => ({
  arrow: {
    color: 'grey',
    fontSize: '30px',
  },
}));

function Comment() {
  const { classes } = useStyles();

  return (
    <CommentLayout
      avatar={
        <Avatar
          size="md"
          radius="xl"
          src="https://res.cloudinary.com/rices/image/upload/v1653666783/zivhuyp61daafykvvohh.png"
          sx={{ backgroundColor: '#fff' }}
        />
      }
      info={
        <Group noWrap={true} spacing={5}>
          <Text weight={700} size="xs">
            AnywhereCivil5027
          </Text>

          <Text size="xs">·</Text>

          <Text size="xs" color="gray">
            {format(new Date('2022-05-27 17:16:50.685'), 'commentTime')}
          </Text>
        </Group>
      }
      main={<ReadOnlyCommentEditor />}
      votes={
        <Group align="center" noWrap={true} spacing={4}>
          <ActionIcon variant="transparent" size="sm">
            <TbArrowBigTop className={classes.arrow} />
          </ActionIcon>

          <Text weight={700} size="sm" color="gray">
            {/* {voteCount(post.votes)} */}
            10
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
