import { Skeleton, Group, Stack } from '@mantine/core';
function PostSkeleton({ animate }: { animate?: boolean }) {
  return (
    <Stack>
      <Group noWrap={true}>
        <Skeleton animate={animate} height={8} width="10%" radius="xl" />
        <Skeleton animate={animate} height={8} width="10%" radius="xl" />
      </Group>
      <Skeleton animate={animate} height={30} width="80%" />

      <Skeleton animate={animate} height={300} width="95%" />

      <Group noWrap={true}>
        <Skeleton animate={animate} height={40} width="15%" />
        <Skeleton animate={animate} height={40} width="15%" />
      </Group>
    </Stack>
  );
}

export default PostSkeleton;
