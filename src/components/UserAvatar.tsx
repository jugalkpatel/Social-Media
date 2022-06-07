import { useReactiveVar } from '@apollo/client';
import { Avatar } from '@mantine/core';
import { userPictureVar } from 'lib';

export function UserAvatar() {
  const userPicture = useReactiveVar(userPictureVar);
  return (
    <Avatar
      src={userPicture || null}
      radius="lg"
      size="md"
      sx={{ backgroundColor: 'white', height: '100%' }}
    />
  );
}
