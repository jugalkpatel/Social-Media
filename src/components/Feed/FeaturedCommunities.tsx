import { nanoid } from 'nanoid';
import {
  createStyles,
  Stack,
  Text,
  Title,
  Loader,
  Center,
  Group,
  Avatar,
  Divider,
  ScrollArea,
} from '@mantine/core';
import { useRouter } from 'next/router';

import { JoinCommunity } from 'components';
import { useFetchAllCommunities } from 'operations';

const useStyles = createStyles((theme) => ({
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[6]
    }`,
    borderRadius: '0.3rem',
  },
  background: {
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
}));

type CommunityTileProps = {
  picture: string;
  name: string;
  id: string;
};

function CommunityTile({ id, name, picture }: CommunityTileProps) {
  const router = useRouter();
  return (
    <>
      <Group sx={{ justifyContent: 'space-between' }} px="md">
        <Group spacing="xs">
          <Avatar
            src={picture}
            sx={{ backgroundColor: 'white' }}
            size="sm"
            radius="lg"
          />
          <Text
            lineClamp={1}
            weight={700}
            size="sm"
            sx={{ maxWidth: '6rem', cursor: 'pointer' }}
            onClick={() => router.push(`/c/${name}`)}
          >
            c/{name}
          </Text>
        </Group>

        <JoinCommunity
          data={{ communityId: id, title: name }}
          fullWidth={false}
        />
      </Group>
      <Divider size="xs" />
    </>
  );
}

function FeaturedCommunities() {
  const { classes } = useStyles();
  const { communities, state } = useFetchAllCommunities();

  if (state === 'ERROR') {
    return null;
  }

  return (
    <Stack className={classes.border} p={0} sx={{ gap: '0' }}>
      <Title order={6} px="md" py="xs" className={classes.background}>
        Featured Communities
      </Title>

      {state === 'LOADING' ? (
        <Center sx={{ height: '70%' }}>
          <Loader />
        </Center>
      ) : null}

      <ScrollArea style={{ maxHeight: '20rem' }} type="auto" scrollbarSize={1}>
        <Stack spacing="xs" py="xs" sx={{ maxHeight: '20rem' }}>
          {communities && communities.length
            ? communities.map(({ id, picture, title }) => {
                return (
                  <CommunityTile
                    key={nanoid()}
                    id={id}
                    picture={picture}
                    name={title}
                  />
                );
              })
            : null}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}

export default FeaturedCommunities;
