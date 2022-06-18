import { Button, createStyles, Stack } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    gridTemplateRows: '1fr',
    gap: '0.5rem',

    [theme.fn.largerThan('sm')]: {
      gap: '1rem',
    },
  },
  button: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
}));

type Props = {
  avatar: React.ReactNode;
  main: React.ReactNode;
  info: React.ReactNode;
  votes: React.ReactNode;
};

function CommentLayout({ avatar, main, info, votes }: Props) {
  const { classes } = useStyles();
  const [, scrollTo] = useWindowScroll();
  return (
    <div className={classes.grid}>
      {avatar}
      <Stack py={5} spacing={5}>
        {info}
        {main}
        {votes}
      </Stack>
      <Button
        className={classes.button}
        size="xs"
        px="sm"
        onClick={() => scrollTo({ y: 0 })}
      >
        Back to Top
      </Button>
    </div>
  );
}

export default CommentLayout;
