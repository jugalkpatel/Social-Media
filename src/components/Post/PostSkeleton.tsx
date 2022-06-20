import { Skeleton, Group, Stack, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[6]
    }`,
    borderRadius: '0.3rem',
  },
  spacing: {
    padding: '0.5rem',
    [theme.fn.largerThan('sm')]: {
      padding: '0.7rem',
    },
    [theme.fn.largerThan('lg')]: {
      padding: '1rem',
    },
  },
}));

function PostSkeleton({ animate }: { animate?: boolean }) {
  const { classes, cx } = useStyles();
  return (
    <Stack className={cx(classes.border, classes.spacing)}>
      <Group noWrap={true}>
        <Skeleton animate={animate} height={8} width="10%" radius="xl" />
        <Skeleton animate={animate} height={8} width="10%" radius="xl" />
      </Group>
      <Skeleton animate={animate} height={30} width="80%" />

      <Skeleton animate={animate} height={300} width="95%" />

      <Group noWrap={true}>
        <Skeleton animate={animate} height={40} width="15%" />
        <Skeleton animate={animate} height={40} width="15%" />
      </Group>
    </Stack>
  );
}

export default PostSkeleton;
