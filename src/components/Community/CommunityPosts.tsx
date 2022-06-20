import { Stack } from '@mantine/core';

import { PostSkeleton, Post } from 'components';
import { useFetchCommunityPosts } from 'operations';

type Props = {
  title: string;
};

function CommunityPosts({ title }: Props) {
  const { posts, state } = useFetchCommunityPosts({ title });
  console.log({ posts, state });

  if (state === 'ERROR') {
    return null;
  }

  if (state === 'LOADING') {
    return (
      <Stack spacing={30}>
        {new Array(5).fill(0).map((_, index) => {
          return <PostSkeleton key={index} />;
        })}
      </Stack>
    );
  }

  return (
    <Stack>
      {posts.map((post) => {
        return <Post key={post.id} post={post} list={true} />;
      })}
    </Stack>
  );
}

export default CommunityPosts;
