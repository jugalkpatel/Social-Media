import {
  createStyles,
  MediaQuery,
  Group,
  Input,
  Stack,
  Text,
  Divider,
  Button,
  Title,
  Center,
  Skeleton,
} from '@mantine/core';
import { MdCake } from 'react-icons/md';
import { format } from 'fecha';

import { CommunityPost, State } from 'types';
import { UserAvatar, ContainerLayout } from 'components';

type Props = {
  data: {
    memberCount: number;
    description: string;
    date: string;
    posts: Array<CommunityPost>;
    isAuthenticated: boolean;
    isUserInCommunity: boolean;
    onCreatePost: () => void;
    state: State;
  };
};

const useStyles = createStyles((theme) => ({
  mobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    gap: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',

    [theme.fn.largerThan('lg')]: {
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: 'max-content 2fr auto',
      gap: '1rem',
    },
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
  },
  padding: {
    padding: '1rem 0',
  },
  paddingHalf: {
    padding: '0.5rem',
  },
}));

export function CommunityContent({
  data: {
    description,
    memberCount,
    date,
    posts,
    onCreatePost,
    isUserInCommunity,
    isAuthenticated,
    state,
  },
}: Props) {
  const { classes, cx } = useStyles();

  return (
    <ContainerLayout>
      <div className={cx(classes.grid, classes.padding)}>
        <div className={classes.mobile}>
          {isAuthenticated && isUserInCommunity ? (
            <Group
              className={cx(
                classes.background,
                classes.paddingHalf,
                classes.border,
              )}
              direction="row"
              sx={{ flexWrap: 'nowrap', gridRow: '1/2', gridColumn: '1/2' }}
            >
              <UserAvatar />
              <Input
                placeholder="Create Post"
                sx={{ width: '100%' }}
                onClick={onCreatePost}
              />
            </Group>
          ) : null}

          <Stack>
            {posts.length ? (
              <h1>there are some posts</h1>
            ) : (
              <Center style={{ height: '30vh' }}>
                <Stack justify="center" align="center">
                  <Title order={4} align="center">
                    There are no posts in this community.
                  </Title>
                  {isAuthenticated && isUserInCommunity ? (
                    <Button radius="lg" onClick={onCreatePost}>
                      Add a post
                    </Button>
                  ) : null}
                </Stack>
              </Center>
            )}
          </Stack>
        </div>

        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <Stack
            className={cx(classes.background, classes.border)}
            p="md"
            sx={{ gridRow: '1/3', gridColumn: '2/3' }}
            justify="space-evenly"
          >
            <Text size="sm" weight={700}>
              About Community
            </Text>

            <Text lineClamp={5}>{description}</Text>

            {state === 'ERROR' ? null : (
              <Skeleton
                visible={state === 'LOADING'}
                sx={{ width: 'fit-content' }}
              >
                <Stack sx={{ gap: 0 }}>
                  <Text weight={700}>{memberCount}</Text>
                  <Text size="sm">Members</Text>
                </Stack>
              </Skeleton>
            )}

            <Divider size="xs" />

            <Stack>
              <Group align="center" sx={{ gap: '10px' }}>
                <MdCake fontSize={25} />
                <Text weight={500}>
                  Created {format(new Date(date), 'mediumDate')}
                </Text>
              </Group>
              {isAuthenticated && isUserInCommunity ? (
                <Button radius="lg" onClick={onCreatePost}>
                  Create Post
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </MediaQuery>
      </div>
    </ContainerLayout>
  );
}
