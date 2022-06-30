import { createStyles, Stack, Text, MediaQuery } from '@mantine/core';

import { ContainerLayout } from 'components';

type Props = {
  main: React.ReactNode;
  featured: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    padding: '0.5rem 0',

    [theme.fn.largerThan('lg')]: {
      gridTemplateColumns: '2.3fr 1fr',
      gridTemplateRows: 'minmax(max-content, 300px) 1fr',
      gap: '0.7rem',
      padding: '1rem 0',
    },
  },
}));

function FeedLayout({ main, featured }: Props) {
  const { classes } = useStyles();

  return (
    <ContainerLayout>
      <div className={classes.grid}>
        <Stack sx={{ gridRow: '1/-1' }}>{main}</Stack>

        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <Stack sx={{ gridRow: '1/2' }}>{featured}</Stack>
        </MediaQuery>
      </div>
    </ContainerLayout>
  );
}

export default FeedLayout;
