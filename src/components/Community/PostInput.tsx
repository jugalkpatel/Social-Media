import { useRouter } from 'next/router';
import { Group, Input, createStyles } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IoMdClose } from 'react-icons/io';

import { useCheckUserInCommunity } from 'hooks';
import { UserAvatar } from 'components';
// import { isUserPartOfCommunity, userCommunitiesVar } from 'lib';

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[6]
    }`,
  },
  paddingHalf: {
    padding: '0.5rem',
  },
}));

function PostInput({ communityId }: { communityId: string }) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const { isUserInCommunity } = useCheckUserInCommunity({ communityId });

  const onCreatePost = () => {
    if (isUserInCommunity) {
      router.push('/submit');
      return;
    }
    showNotification({
      message: 'You must join community to create a post.',
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });
  };
  return (
    <>
      {isUserInCommunity ? (
        <Group
          className={cx(
            classes.background,
            classes.paddingHalf,
            classes.border,
          )}
          direction="row"
          sx={{
            flexWrap: 'nowrap',
            gridRow: '1/2',
            gridColumn: '1/2',
            height: 'max-content',
          }}
        >
          <UserAvatar />
          <Input
            placeholder="Create Post"
            sx={{ width: '100%' }}
            onClick={onCreatePost}
          />
        </Group>
      ) : null}
    </>
  );
}

export default PostInput;
