import { Stack, Text, createStyles } from '@mantine/core';

import NotFound from '@/assets/post_not_found.svg';

const useStyles = createStyles((theme) => ({
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[6]
    }`,
    borderRadius: '0.3rem',
  },
}));

function PostNotFound() {
  const { classes } = useStyles();
  return (
    <Stack align="center" className={classes.border} p="md">
      <NotFound />
      <Text weight={700} color="gray" size="lg">
        This post could not be found.
      </Text>
    </Stack>
  );
}

export default PostNotFound;
