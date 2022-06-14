import {
  Stack,
  Image,
  createStyles,
  Group,
  Avatar,
  Text,
  Divider,
} from '@mantine/core';
import { format } from 'fecha';
import { GiCakeSlice } from 'react-icons/gi';

type Props = {
  data: {
    banner: string;
    picture: string;
    title: string;
    description: string;
    memberCount: number;
    createdAt: string;
  };
};

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
    borderRadius: '0.3rem',
  },
}));

function PostCommunity({
  data: { banner, picture, title, description, memberCount, createdAt },
}: Props) {
  const { classes, cx } = useStyles();
  return (
    <Stack className={cx(classes.background, classes.border)} sx={{ gap: '0' }}>
      <Image src={banner} height={30} />
      <Stack p="sm">
        <Group>
          <Avatar
            size="lg"
            src={picture}
            radius="xl"
            sx={{ backgroundColor: '#fff' }}
          />
          <Text weight={700}>c/{title}</Text>
        </Group>

        <Text transform="capitalize" size="sm">
          {description}
        </Text>

        <Stack sx={{ gap: 0 }}>
          <Text weight={700}>{memberCount}</Text>
          <Text size="sm">Members</Text>
        </Stack>

        <Divider size="xs" />

        <Group px={5}>
          <GiCakeSlice fontSize={20} />
          <Text weight={500} size="sm">
            Created {format(new Date(createdAt), 'mediumDate')}
          </Text>
        </Group>

        <Divider size="xs" />
      </Stack>
    </Stack>
  );
}

export default PostCommunity;