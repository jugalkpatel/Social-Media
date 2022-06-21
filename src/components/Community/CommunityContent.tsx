import {
  createStyles,
  MediaQuery,
  Group,
  Stack,
  Text,
  Divider,
  Title,
  Center,
} from '@mantine/core';
import { MdCake } from 'react-icons/md';
import { format } from 'fecha';

import { ContainerLayout } from 'components';

type Props = {
  data: {
    description: string;
    date: string;
  };
  input: React.ReactNode;
  addPost: React.ReactNode;
  count: React.ReactNode;
  allPosts: React.ReactNode;
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
      gridTemplateRows: '300px auto',
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
}));

function CommunityContent({
  data: { description, date },
  addPost,
  input,
  count,
  allPosts,
}: Props) {
  const { classes, cx } = useStyles();
  const posts = [1, 2, 3, 4];

  return (
    <ContainerLayout>
      <div className={cx(classes.grid, classes.padding)}>
        <div className={classes.mobile}>
          {input}

          <Stack>
            {posts.length ? (
              allPosts
            ) : (
              <Center style={{ height: '30vh' }}>
                <Stack justify="center" align="center">
                  <Title order={4} align="center">
                    There are no posts in this community.
                  </Title>

                  {addPost}
                </Stack>
              </Center>
            )}
          </Stack>
        </div>

        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <Stack
            className={cx(classes.background, classes.border)}
            p="md"
            sx={{ gridRow: '1/2', gridColumn: '2/3' }}
            justify="space-evenly"
          >
            <Text size="sm" weight={700}>
              About Community
            </Text>

            <Text lineClamp={5}>{description}</Text>

            {count}

            <Divider size="xs" />

            <Stack>
              <Group align="center" sx={{ gap: '10px' }}>
                <MdCake fontSize={25} />
                <Text weight={500}>
                  Created {format(new Date(date), 'mediumDate')}
                </Text>
              </Group>

              {addPost}
            </Stack>
          </Stack>
        </MediaQuery>
      </div>
    </ContainerLayout>
  );
}

export default CommunityContent;
