import { createStyles } from '@mantine/core';

export type Props = {
  top: React.ReactNode;
  title: React.ReactNode;
  main: React.ReactNode;
  bottom: React.ReactNode;
  desktopOnly: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  outerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'max-content 1fr',
    gap: '0.5rem',
    width: '100%',

    [theme.fn.largerThan('lg')]: {
      gridTemplateColumns: 'max-content 1fr',
      gridTemplateRows: '1fr',
      gap: '0',
    },
  },
  innerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows:
      '1fr minmax(20px, max-content) minmax(150px, max-content)',
    gap: '0.5rem',

    [theme.fn.largerThan('lg')]: {
      gridColumn: '2 / 3',
      gridTemplateRows:
        '1fr minmax(20px, max-content) minmax(150px, max-content) 0.5fr',
    },
  },
  left: {
    [theme.fn.largerThan('lg')]: {
      gridColumn: '1 / 2',
      gridRow: '1 / -1',
    },
  },
}));

function PostContentLayout({ top, title, main, bottom, desktopOnly }: Props) {
  const { classes } = useStyles();
  return (
    <div className={classes.outerGrid}>
      <article className={classes.innerGrid}>
        {top}
        {title}
        {main}
        {desktopOnly}
      </article>
      <article className={classes.left}>{bottom}</article>
    </div>
  );
}

export default PostContentLayout;
