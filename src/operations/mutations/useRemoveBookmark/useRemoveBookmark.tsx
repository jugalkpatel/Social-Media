import { Bookmark, BookmarkParams } from 'types';
import {
  useRemoveBookmarkMutation,
  RemoveBookmarkMutationFn,
} from 'operations';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import { userBookmarksVar } from 'lib';
import { ReactiveVar } from '@apollo/client';

type RemoveParams = CommonNotificationParms & {
  remove: RemoveBookmarkMutationFn;
  updateLocalBookmarks: (deletedBookmark: Bookmark) => void;
};

type RemoveBookmarkParams = {
  postId: string;
};

function remove({
  remove,
  success,
  error: showError,
  updateLocalBookmarks,
}: RemoveParams) {
  return async ({ postId, updateCache }: BookmarkParams) => {
    try {
      await remove({
        variables: { postId },
        update: (cache, { data: { removeBookmark } }) => {
          if (removeBookmark.__typename === 'CommonError') {
            throw new Error(removeBookmark.message);
          }

          if (removeBookmark.__typename === 'Post') {
            const deletedPost = removeBookmark;

            updateLocalBookmarks({ __typename: 'Post', id: deletedPost.id });

            updateCache({ cache, bookmark: deletedPost });

            success('Removed Post from Bookmarks');

            return;
          }

          throw new Error();
        },
      });
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong!';
      showError(errorMessage);
    }
  };
}

function removeBookmark(bookmarkFunc: ReactiveVar<Bookmark[]>) {
  const existingBookmarks = bookmarkFunc();

  return (deletedBookmark: Bookmark) => {
    bookmarkFunc(
      existingBookmarks.filter(({ id }) => id !== deletedBookmark.id),
    );
  };
}

function useRemoveBookmark() {
  const [mutationFn, { loading }] = useRemoveBookmarkMutation();
  const { success, error } = useCommonNotifications();
  const updateLocalBookmarks = removeBookmark(userBookmarksVar);

  const deleteBookmark = remove({
    remove: mutationFn,
    success,
    error,
    updateLocalBookmarks,
  });

  return { deleteBookmark, loading };
}

export default useRemoveBookmark;
