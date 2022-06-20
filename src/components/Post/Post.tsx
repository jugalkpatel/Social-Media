import Link from 'next/link';
import {
  Group,
  Avatar,
  Title,
  ActionIcon,
  MediaQuery,
  Stack,
  Button,
  Text,
  createStyles,
} from '@mantine/core';
import { format } from 'fecha';
import { IoBookmarkOutline } from 'react-icons/io5';
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';
import { VscComment } from 'react-icons/vsc';

import { Post } from 'types';
import { PostLayout, ReadOnlyEditor } from 'components';
import { voteCount } from 'lib';

type Props = {
  post: Post;
  list?: boolean;
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

function Post({ post, list }: Props) {
  const { classes, cx } = useStyles();
  return (
    <Group
      direction="column"
      noWrap={true}
      className={cx(classes.flex, classes.background, classes.border)}
      p={3}
      spacing={0}
    >
      <PostLayout
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
        main={
          <ReadOnlyEditor
            content={post.content}
            variant={list ? 'LIST' : 'DEFAULT'}
          />
        }
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
              <Stack spacing={0}>
                <Link href="#comments" replace>
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

export default Post;
