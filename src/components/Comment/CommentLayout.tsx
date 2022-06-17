import { createStyles, Stack } from '@mantine/core';

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
}));

type Props = {
  avatar: React.ReactNode;
  main: React.ReactNode;
  info: React.ReactNode;
  votes: React.ReactNode;
};

function CommentLayout({ avatar, main, info, votes }: Props) {
  const { classes } = useStyles();
  return (
    <div className={classes.grid}>
      {avatar}
      <Stack py={5} spacing={5}>
        {info}
        {main}
        {votes}
      </Stack>
    </div>
  );
}

export default CommentLayout;
