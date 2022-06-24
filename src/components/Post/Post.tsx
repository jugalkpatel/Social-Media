import Link from 'next/link';
import Router from 'next/router';
import {
  Group,
  Avatar,
  Title,
  MediaQuery,
  Stack,
  Button,
  Text,
  createStyles,
} from '@mantine/core';
import { format } from 'fecha';
import { IoBookmarkOutline } from 'react-icons/io5';
import { VscComment } from 'react-icons/vsc';

import { Post } from 'types';
import { PostLayout, ReadOnlyEditor, PostVotes } from 'components';

type Props = {
  post: Post;
  list?: boolean;
  votes: React.ReactNode;
};

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

const redirect = (e: React.SyntheticEvent, url: string): void => {
  Router.push(url);
  // console.log(`clicked on ${url}`);

  e.stopPropagation();
};

function Post({ post, list, votes }: Props) {
  const { classes, cx } = useStyles();
  const postUrl = list
    ? `/c/${post.community.title}/posts/${post.id}`
    : `/c/${post.community.title}/posts/${post.id}#comments`;
  return (
    <Group
      direction="column"
      noWrap={true}
      className={cx(classes.flex, classes.background, classes.border)}
      p={3}
      spacing={0}
      onClick={(e) => {
        if (list) {
          redirect(e, `/c/${post.community.title}/posts/${post.id}`);
        }
      }}
      sx={{ cursor: list ? 'pointer' : '' }}
    >
      <PostLayout
        top={
          <Group className={classes.padding} spacing="xs">
            <Avatar
              src={post.community.picture}
              radius="xl"
              sx={{ backgroundColor: '#fff', cursor: 'pointer' }}
              onClick={(e) => redirect(e, `/c/${post.community.title}`)}
            />

            <Group direction="column" sx={{ gap: '0' }}>
              <Text
                weight={700}
                onClick={(e) => redirect(e, `/c/${post.community.title}`)}
                sx={{ cursor: 'pointer' }}
              >
                r/{post.community.title}
              </Text>
              <Text size="sm">
                u/{post.postedBy.name} ·{' '}
                {format(new Date(post.createdAt), 'timeFormat')}
              </Text>
            </Group>
          </Group>
        }
        title={
          <Title order={2} className={classes.padding}>
            {post.title}
          </Title>
        }
        main={
          <ReadOnlyEditor
            content={post.content}
            variant={list ? 'LIST' : 'DEFAULT'}
          />
        }
        bottom={
          <Group noWrap={true} className={classes.margin}>
            <Group align="center" noWrap={true} className={classes.desktop}>
              {votes}
            </Group>

            <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
              <Stack spacing={0}>
                <Link href={postUrl} replace={!list}>
                  <Button
                    leftIcon={<VscComment className={classes.fontSize} />}
                    variant="subtle"
                    color="gray"
                    sx={{ color: 'gray' }}
                    px="sm"
                    size="xs"
                    component="a"
                  >
                    {post.comments.length} Comments
                  </Button>
                </Link>
              </Stack>
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
              <Link href={postUrl} replace={!list}>
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
              </Link>

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

export default Post;
