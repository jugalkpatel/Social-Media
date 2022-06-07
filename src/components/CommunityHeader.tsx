import {
  Stack,
  Image,
  AspectRatio,
  Avatar,
  createStyles,
  MediaQuery,
  Text,
  Group,
  Skeleton,
} from '@mantine/core';

import { State } from 'types';
import { ContainerLayout } from 'components';

type Props = {
  data: {
    banner: string;
    picture: string;
    title: string;
    description: string;
    memberCount: number;
    state: State;
  };
  children: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    justifyItems: 'center',
    paddingBottom: '2rem',

    [theme.fn.largerThan('sm')]: {
      gridTemplateRows: '1fr',
      gridTemplateColumns: 'max-content 1fr',
      justifyItems: 'start',
      gap: '1rem',

      maxHeight: '20vh',
    },
  },
  avatar: {
    postion: 'absolute',
    backgroundColor: 'white',
    top: '-0.7rem',
  },
  text: {
    fontSize: '24px',
    [theme.fn.largerThan('sm')]: {
      textAlign: 'left',
    },
  },
  subText: {
    [theme.fn.largerThan('sm')]: {
      textAlign: 'left',
      fontWeight: 500,
    },
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  padding: {
    paddingTop: '5px',
    [theme.fn.largerThan('md')]: {
      paddingTop: '10px',
    },
  },
  justify: {
    justifyContent: 'center',

    [theme.fn.largerThan('sm')]: {
      justifyContent: 'start',
    },
  },
  direction: {
    flexDirection: 'column',
    [theme.fn.largerThan('sm')]: {
      flexDirection: 'row',
    },
  },
  spacing: {
    gap: '14px',
    [theme.fn.largerThan('sm')]: {
      gap: '26px',
    },
  },
  background: {
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
}));

const CommunityHeader: React.FC<Props> = ({
  data: { banner, description, memberCount, picture, title, state },
  children,
}) => {
  const { classes, cx } = useStyles();
  return (
    <Stack sx={{ gap: 0 }} className={classes.background}>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <AspectRatio ratio={4 / 1}>
          <Image src={banner} />
        </AspectRatio>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <AspectRatio ratio={7 / 1}>
          <Image src={banner} />
        </AspectRatio>
      </MediaQuery>

      <ContainerLayout>
        <div className={classes.grid}>
          <article style={{ position: 'relative' }}>
            <Avatar
              src={picture}
              className={classes.avatar}
              radius="md"
              size="lg"
            />
          </article>

          <Group
            className={cx(classes.justify, classes.direction, classes.spacing)}
          >
            <Stack sx={{ gap: '0' }}>
              <Text
                size="xl"
                weight={700}
                lineClamp={1}
                transform="capitalize"
                className={classes.text}
                align="center"
              >
                {title}
              </Text>

              <Text
                size="sm"
                align="center"
                className={classes.subText}
                lineClamp={1}
              >
                c/{title}
              </Text>
            </Stack>

            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Stack align="center">
                <Text size="md" align="center" lineClamp={3}>
                  {description}
                </Text>
                {state === 'ERROR' ? null : (
                  <Skeleton
                    visible={state === 'LOADING'}
                    sx={{ width: 'fit-content' }}
                  >
                    <Text size="md" weight={700} align="center" py={'10px'}>
                      {memberCount} members
                    </Text>
                  </Skeleton>
                )}
              </Stack>
            </MediaQuery>

            {children}
          </Group>
        </div>
      </ContainerLayout>
    </Stack>
  );
};

export default CommunityHeader;
