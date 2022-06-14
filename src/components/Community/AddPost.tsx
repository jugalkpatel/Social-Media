import { useRouter } from 'next/router';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IoMdClose } from 'react-icons/io';

import { useCheckUserInCommunity } from 'hooks';

function AddPost({ title }: { title: string }) {
  const router = useRouter();
  const { isUserInCommunity } = useCheckUserInCommunity({ title });

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
        <Button radius="lg" onClick={onCreatePost}>
          Add a post
        </Button>
      ) : null}
    </>
  );
}

export default AddPost;
