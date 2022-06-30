import { createStyles, Stack, Text } from '@mantine/core';

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

function FeaturedCommunities() {
  const { classes } = useStyles();
  return (
    <Stack className={classes.border} p="md">
      <Text>Featured Communities</Text>
    </Stack>
  );
}

export default FeaturedCommunities;
