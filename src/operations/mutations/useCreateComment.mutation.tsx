import { showNotification } from '@mantine/notifications';

import {
  useCreateCommentMutation,
  CreateCommentMutationFn,
  FetchPostQuery,
  FetchPostQueryVariables,
  FetchPostDocument,
} from 'graphql-generated';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

type Params = {
  createComment: CreateCommentMutationFn;
  postId: string;
  text: string;
};

async function onCreateCommentClick({ createComment, postId, text }: Params) {
  try {
    await createComment({
      variables: { postId, text },
      update: (cache, { data }) => {
        if (
          data &&
          data.createComment &&
          data.createComment.__typename === 'CommentError'
        ) {
          throw new Error(data.createComment.message);
        }

        if (
          data &&
          data.createComment &&
          data.createComment.__typename === 'Comment'
        ) {
          const newComment = data.createComment;

          const { fetchPost } = cache.readQuery<
            FetchPostQuery,
            FetchPostQueryVariables
          >({
            query: FetchPostDocument,
            variables: { postId },
          });

          if (fetchPost && fetchPost.__typename === 'IPostType') {
            const { comments } = fetchPost;

            cache.writeQuery<FetchPostQuery>({
              query: FetchPostDocument,
              data: {
                fetchPost: {
                  ...fetchPost,
                  comments: comments.concat(newComment),
                },
              },
            });

            showNotification({
              message: 'comment created succssfully',
              autoClose: 3000,
              icon: <IoMdCheckmark />,
              color: 'green',
            });
          }

          if (fetchPost.__typename === 'PostError') {
            throw new Error(fetchPost.message);
          }
        }
      },
    });
  } catch (error) {
    showNotification({
      message: error?.message || 'error occurred while creating comment',
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });
  }
}

function useCreateComment() {
  const [mutationFn, { loading }] = useCreateCommentMutation();

  const createComment = ({ postId, text }: { postId: string; text: string }) =>
    onCreateCommentClick({ createComment: mutationFn, postId, text });

  return { createComment, loading };
}

export default useCreateComment;
