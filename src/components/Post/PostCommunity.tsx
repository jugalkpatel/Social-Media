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
import { useRouter } from 'next/router';

type Props = {
  joinElement: React.ReactNode;
  countElement: React.ReactNode;
  data: {
    banner: string;
    picture: string;
    title: string;
    description: string;
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
  joinElement,
  countElement,
  data: { banner, picture, title, description, createdAt },
}: Props) {
  const { classes, cx } = useStyles();
  const router = useRouter();
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
          <Text
            weight={700}
            onClick={() => router.push(`/c/${title}`)}
            sx={{ cursor: 'pointer' }}
          >
            c/{title}
          </Text>
        </Group>

        <Text transform="capitalize" size="sm">
          {description}
        </Text>

        {countElement}

        <Divider size="xs" />

        <Group px={5}>
          <GiCakeSlice fontSize={20} />
          <Text weight={500} size="sm">
            Created {format(new Date(createdAt), 'mediumDate')}
          </Text>
        </Group>

        <Divider size="xs" />

        {joinElement}
      </Stack>
    </Stack>
  );
}

export default PostCommunity;
