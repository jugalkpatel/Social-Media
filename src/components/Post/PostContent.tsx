import { useRouter } from 'next/router';
import { format, setGlobalDateMasks } from 'fecha';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import {
  Group,
  createStyles,
  Text,
  MediaQuery,
  ActionIcon,
  Button,
  Avatar,
  Title,
} from '@mantine/core';
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb';
import { VscComment } from 'react-icons/vsc';
import { IoBookmarkOutline } from 'react-icons/io5';

import { PostParams } from 'types';
import { PostSkeleton, ReadOnlyEditor, PostContentLayout } from 'components';
import { useFetchPost } from 'operations';
import { voteCount } from 'lib';

setGlobalDateMasks({
  postTime: '[on] MMMM Do, YY · hh:mm A',
});

const useStyles = createStyles((theme) => ({
  flex: {
    display: 'flex',
    [theme.fn.largerThan('lg')]: {
      flexDirection: 'row-reverse',
      justifyContent: 'start',
    },
  },
  desktop: {
    gap: '7px',
    [theme.fn.largerThan('lg')]: {
      flexDirection: 'column',
      gap: '3px',
      paddingTop: '10px',
      gridColumn: '1 / 2',
      gridRow: '1 / -1',
    },
  },
  arrow: {
    color: 'grey',
    fontSize: '20px',
  },
  fontSize: {
    fontSize: '20px',
  },
  spacing: {
    gap: '10px',
  },
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
  padding: {
    padding: '10px',
    paddingBottom: '0',
  },
  margin: {
    margin: '0px 7px',
    [theme.fn.largerThan('lg')]: {
      margin: '0px 0px',
    },
  },
}));

function getPostId(query: NextParsedUrlQuery) {
  if (!('id' in query)) {
    return '';
  }

  const { id } = query as PostParams;

  return id;
}

function PostContent() {
  const { query } = useRouter();
  const { classes, cx } = useStyles();

  const { post, state } = useFetchPost({ postId: getPostId(query) });

  if (state === 'ERROR') {
    return null;
  }

  if (state === 'LOADING') {
    return <PostSkeleton />;
  }

  return (
    <Group
      direction="column"
      noWrap={true}
      className={cx(classes.flex, classes.background, classes.border)}
      p={3}
      spacing={0}
    >
      <PostContentLayout
        top={
          <Group className={classes.padding}>
            <Avatar
              src={post.community.picture}
              radius="xl"
              sx={{ backgroundColor: '#fff' }}
            />

            <Group direction="column" sx={{ gap: '0' }}>
              <Text weight={700}>r/{post.community.title}</Text>
              <Text size="sm">
                u/{post.postedBy.name} ·{' '}
                {format(new Date(post.createdAt), 'postTime')}
              </Text>
            </Group>
          </Group>
        }
        title={
          <Title order={2} className={classes.padding}>
            {post.title}
          </Title>
        }
        main={<ReadOnlyEditor content={post.content} />}
        bottom={
          <Group noWrap={true} className={classes.margin}>
            <Group align="center" noWrap={true} className={classes.desktop}>
              <ActionIcon variant="transparent" size="sm">
                <TbArrowBigTop className={classes.arrow} />
              </ActionIcon>

              <Text weight={700} size="sm" color="gray">
                {voteCount(post.votes)}
              </Text>

              <ActionIcon size="sm">
                <TbArrowBigDown className={classes.arrow} />
              </ActionIcon>
            </Group>

            <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
              <Button
                leftIcon={<VscComment className={classes.fontSize} />}
                variant="subtle"
                color="gray"
                sx={{ color: 'gray' }}
                px="sm"
                size="xs"
              >
                {post.comments.length} Comments
              </Button>
            </MediaQuery>

            <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
              <Button
                leftIcon={<IoBookmarkOutline className={classes.fontSize} />}
                variant="subtle"
                color="gray"
                px="sm"
                sx={{ color: 'gray' }}
                size="xs"
              >
                Save
              </Button>
            </MediaQuery>
          </Group>
        }
        desktopOnly={
          <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
            <Group noWrap={true} spacing={5} pb={5}>
              <Button
                leftIcon={<VscComment className={classes.fontSize} />}
                variant="subtle"
                color="gray"
                sx={{ color: 'gray' }}
                px="sm"
                size="xs"
              >
                {post.comments.length} Comments
              </Button>

              <Button
                leftIcon={<IoBookmarkOutline className={classes.fontSize} />}
                variant="subtle"
                color="gray"
                px="sm"
                size="xs"
                sx={{ color: 'gray' }}
              >
                Save
              </Button>
            </Group>
          </MediaQuery>
        }
      />
    </Group>
  );
}

export default PostContent;
