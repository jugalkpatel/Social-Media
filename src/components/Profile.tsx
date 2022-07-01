import {
  Center,
  Stack,
  Avatar,
  createStyles,
  Title,
  Group,
  Text,
  Divider,
  Button,
  Loader,
} from '@mantine/core';

import { ContainerLayout } from 'components';
import { useFetchUserDetails } from 'operations';

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
  },
  width: {
    width: '100%',
    [theme.fn.largerThan('sm')]: {
      width: '70%',
    },
  },
  margin: {
    margin: '120px 0 0 0',

    [theme.fn.largerThan('sm')]: {
      margin: '80px 0 0 0',
    },
  },
}));

type ProfileTileProps = {
  label: string;
  value: number;
};

function ProfileTile({ label, value }: ProfileTileProps) {
  const { classes } = useStyles();
  return (
    <>
      <Group
        className={classes.background}
        p="md"
        sx={{ justifyContent: 'space-between' }}
      >
        <Text weight={600} color="white">
          {label}
        </Text>
        <Text weight={600} color="white">
          {value}
        </Text>
      </Group>
    </>
  );
}

function Profile() {
  const { classes, cx } = useStyles();
  const { user, state } = useFetchUserDetails();

  if (state === 'LOADING') {
    return (
      <Center sx={{ height: '30rem' }}>
        <Loader variant="bars" />
      </Center>
    );
  }

  if (state === 'ERROR') {
    return null;
  }

  console.log({ user, state });

  return (
    <ContainerLayout>
      <Center className={classes.margin}>
        <Stack className={classes.width}>
          <Center>
            <Stack>
              <Center>
                <Avatar src={user.picture} size={120} />
              </Center>

              <Title order={2} align="center">
                {user.name}
              </Title>
            </Stack>
          </Center>
          <Stack sx={{ gap: '0' }}>
            <ProfileTile
              label="Joined Communities"
              value={user.joinedCommunities.length}
            />

            <Divider size="xs" />

            <ProfileTile label="Posts Created" value={user.posts.length} />

            <Divider size="xs" />

            <ProfileTile
              label="Bookmarked Posts"
              value={user.bookmarks.length}
            />
          </Stack>

          <Center>
            <Button sx={{ width: 'fit-content' }} uppercase>
              Logout
            </Button>
          </Center>
        </Stack>
      </Center>
    </ContainerLayout>
  );
}

export default Profile;
