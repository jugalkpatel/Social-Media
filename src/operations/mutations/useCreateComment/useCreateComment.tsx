import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import {
  useCreateCommentMutation,
  CreateCommentMutationFn,
  FetchPostQuery,
  FetchPostQueryVariables,
  FetchPostDocument,
} from 'operations';

function create(createComment: CreateCommentMutationFn) {
  return async ({ postId, text }: { postId: string; text: string }) => {
    try {
      await createComment({
        variables: { postId, text },
        update: (cache, { data: { createComment } }) => {
          if (createComment.__typename === 'CommonError') {
            throw new Error(createComment.message);
          }

          if (createComment.__typename === 'Comment') {
            const newComment = createComment;

            const { fetchPost } = cache.readQuery<
              FetchPostQuery,
              FetchPostQueryVariables
            >({
              query: FetchPostDocument,
              variables: { postId },
            });

            if (fetchPost.__typename === 'Post') {
              cache.writeQuery<FetchPostQuery>({
                query: FetchPostDocument,
                data: {
                  fetchPost: {
                    ...fetchPost,
                    comments: [...fetchPost.comments, newComment],
                  },
                },
              });

              showNotification({
                message: `comment added successfully`,
                autoClose: 3000,
                icon: <IoMdCheckmark />,
                color: 'green',
              });

              return;
            }

            if (fetchPost.__typename === 'CommonError') {
              throw new Error(fetchPost.message);
            }
          }

          throw new Error();
        },
      });
    } catch (error) {
      showNotification({
        message: error?.message || 'something went wrong!',
        autoClose: 3000,
        icon: <IoMdClose />,
        color: 'red',
      });
    }
  };
}

function useCreateComment() {
  const [mutationFn, { loading }] = useCreateCommentMutation();

  const createComment = create(mutationFn);

  return { createComment, loading };
}

export default useCreateComment;
