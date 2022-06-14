import {
  Button,
  createStyles,
  Grid,
  Group,
  MediaQuery,
  Text,
} from '@mantine/core';
import { ContainerLayout } from 'components';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

type Props = {
  main: React.ReactNode;
  right: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    position: 'relative',
    paddingTop: '2rem',

    [theme.fn.largerThan('lg')]: {
      gridTemplateColumns: '2.5fr 1fr',
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
}));

function PostLayout({ main, right }: Props) {
  const { classes } = useStyles();
  return (
    <ContainerLayout>
      <div className={classes.grid}>
        {/* <div className={classes.absolute}>
          <Group position="apart" noWrap={true} py={'0.5rem'}>
            <Group noWrap={true}>
              <BsFillFileEarmarkPostFill fontSize={'1rem'} />
              <Text lineClamp={1} size="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                ea?
              </Text>
            </Group>

            <Button
              leftIcon={<GrFormClose />}
              size="xs"
              px="xs"
              variant="subtle"
              color="white"
            >
              Close
            </Button>
          </Group>
        </div> */}
        {main}
        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <div>{right}</div>
        </MediaQuery>
      </div>
    </ContainerLayout>
  );
}

export default PostLayout;