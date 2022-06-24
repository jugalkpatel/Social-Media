import { Stack } from '@mantine/core';
import { PostSkeleton } from 'components';

function PostsSkeleton() {
  return (
    <Stack spacing={30}>
      {new Array(5).fill(0).map((_, index) => {
        return <PostSkeleton key={index} />;
      })}
    </Stack>
  );
}

export default PostsSkeleton;
