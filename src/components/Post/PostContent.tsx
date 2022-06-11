import {
  Group,
  createStyles,
  Stack,
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
import { format, setGlobalDateMasks } from 'fecha';

setGlobalDateMasks({
  postTime: 'hh:mm A',
});

type Props = {
  children: React.ReactNode;
  data: {
    picture: string;
    communityTitle: string;
    postTime: string;
    createdBy: string;
    postTitle: string;
  };
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
}));

function PostContent({
  children,
  data: { picture, communityTitle, postTime, createdBy, postTitle },
}: Props) {
  const { classes, cx } = useStyles();
  return (
    <Group
      direction="column"
      noWrap={true}
      className={cx(classes.flex, classes.background, classes.border)}
      p={3}
      spacing={0}
    >
      <Stack spacing={5}>
        <Group className={classes.padding}>
          <Avatar src={picture} radius="xl" sx={{ backgroundColor: '#fff' }} />

          <Group direction="column" sx={{ gap: '0' }}>
            <Text weight={700}>r/{communityTitle}</Text>
            <Text size="sm">
              u/{createdBy} · {format(new Date(postTime), 'postTime')}
            </Text>
          </Group>
        </Group>

        <Title order={2} className={classes.padding}>
          {postTitle}
        </Title>

        {children}

        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <Group noWrap={true} spacing={5}>
            <Button
              leftIcon={<VscComment className={classes.fontSize} />}
              variant="subtle"
              color="gray"
              sx={{ color: 'gray' }}
              px="sm"
              size="xs"
            >
              12 Comments
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
      </Stack>
      <Group noWrap={true} mx={'7px'}>
        <Group align="center" noWrap={true} className={classes.desktop}>
          <ActionIcon variant="transparent" size="sm">
            <TbArrowBigTop className={classes.arrow} />
          </ActionIcon>

          <Text weight={500} size="sm" color="gray">
            30
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
            12 Comments
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
    </Group>
  );
}

export default PostContent;
