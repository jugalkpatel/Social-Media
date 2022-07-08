import { useRouter } from 'next/router';
import { createStyles, MediaQuery, Stack, Button, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { MdArrowBackIos } from 'react-icons/md';

import { ContainerLayout } from 'components';

type Props = {
  main: React.ReactNode;
  right: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    position: 'relative',
    padding: '2rem 0',

    [theme.fn.largerThan('lg')]: {
      gridTemplateColumns: '2.5fr 1.1fr',
      gap: '1rem',
    },
  },
  absolute: {
    position: 'absolute',
    top: '0',
    // height: '2rem',
    width: '100%',
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
  fontSize: {
    fontSize: '13px',
    color: 'white',
  },
  iconSize: {
    fontSize: '1.5rem',
    color: 'white',

    [theme.fn.largerThan('md')]: {
      fontSize: '1rem',
    },
  },
  button: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
}));

function PostPageLayout({ main, right }: Props) {
  const { classes } = useStyles();
  const [, scrollTo] = useWindowScroll();
  const router = useRouter();
  return (
    <ContainerLayout>
      <div className={classes.grid}>
        <Stack>
          <Button
            variant="subtle"
            size="xs"
            sx={{ width: 'fit-content' }}
            px="xs"
            onClick={() => router.back()}
          >
            <MdArrowBackIos />
            <Text size="xs" px={3}>
              back
            </Text>
          </Button>
          {main}
        </Stack>
        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <div>{right}</div>
        </MediaQuery>
      </div>
      <Button
        className={classes.button}
        size="xs"
        px="sm"
        onClick={() => scrollTo({ y: 0 })}
      >
        Back to Top
      </Button>
    </ContainerLayout>
  );
}

export default PostPageLayout;
