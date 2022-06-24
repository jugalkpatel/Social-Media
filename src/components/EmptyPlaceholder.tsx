import { Center, Stack, Text, createStyles } from '@mantine/core';
import { AiOutlineComment } from 'react-icons/ai';

type Props = {
  height?: number;
  message: string;
};

const useStyles = createStyles((theme) => ({
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[4]
        : theme.colors.dark[6]
    }`,
    borderRadius: '0.3rem',
  },
  color: {
    color:
      theme.colorScheme === 'light'
        ? theme.colors.gray[5]
        : theme.colors.dark[6],
  },
}));

function EmptyPlaceholder({ message, height }: Props) {
  const { classes } = useStyles();
  return (
    <Center
      style={{
        height: height || 200,
      }}
      className={classes.border}
    >
      <Stack align="center">
        <AiOutlineComment fontSize={40} className={classes.color} />
        <Text size="lg" weight={700} className={classes.color}>
          {message}
        </Text>
      </Stack>
    </Center>
  );
}
export default EmptyPlaceholder;
