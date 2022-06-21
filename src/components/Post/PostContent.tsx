import { nanoid } from 'nanoid';
import { Stack } from '@mantine/core';

import {
  PostSkeleton,
  PostNotFound,
  Post,
  CommentSkeleton,
  PostComments,
} from 'components';
import { useFetchPost } from 'operations';

type Props = {
  postId: string;
};

function PostContent({ postId }: Props) {
  const { post, state } = useFetchPost({ postId });

  if (state === 'ERROR') {
    return <PostNotFound />;
  }

  if (state === 'LOADING') {
    return (
      <Stack>
        <PostSkeleton />
        {new Array(3).fill(0).map((_) => {
          return <CommentSkeleton key={nanoid()} />;
        })}
      </Stack>
    );
  }

  return (
    <Stack>
      <Post post={post} />
      <PostComments comments={post.comments} postId={post.id} />
    </Stack>
  );
}

export default PostContent;
