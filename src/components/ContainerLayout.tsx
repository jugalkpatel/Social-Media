import { Container, createStyles } from '@mantine/core';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const useStyles = createStyles((theme) => ({
  width: {
    width: '100%',

    [theme.fn.largerThan('md')]: {
      width: '720px',
    },

    [theme.fn.largerThan('lg')]: {
      width: '990px',
    },

    [theme.fn.largerThan('xl')]: {
      width: '1140px',
    },
  },
}));

export function ContainerLayout({ children }: Props) {
  const { classes } = useStyles();

  return <Container className={classes.width}>{children}</Container>;
}
