import { ReactiveVar } from '@apollo/client';

import { Bookmark, BookmarkParams } from 'types';
import { userBookmarksVar } from 'lib';
import {
  useCreateBookmarkMutation,
  CreateBookmarkMutationFn,
} from 'operations';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';

type CreateParams = CommonNotificationParms & {
  create: CreateBookmarkMutationFn;
  updateLocalBookmarks: (args: Bookmark) => void;
};

function create({
  create,
  success,
  error: showError,
  updateLocalBookmarks,
}: CreateParams) {
  return async ({ postId, updateCache }: BookmarkParams) => {
    try {
      await create({
        variables: { postId },
        update: (cache, { data: { createBookmark } }) => {
          if (createBookmark.__typename === 'CommonError') {
            throw new Error(createBookmark.message);
          }

          if (createBookmark.__typename === 'Post') {
            const bookmarkedPost = createBookmark;

            updateLocalBookmarks({
              __typename: 'Post',
              id: bookmarkedPost.id,
            });

            updateCache({ cache, bookmark: bookmarkedPost });

            success('Added post in bookmarks');

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

function addBookmark(bookmarkFunc: ReactiveVar<Bookmark[]>) {
  const existingBookmarks = bookmarkFunc();

  return (newBookmark: Bookmark) => {
    bookmarkFunc(existingBookmarks.concat(newBookmark));
  };
}

function useCreateBookmark() {
  const [muationFn, { loading }] = useCreateBookmarkMutation();
  const { success, error } = useCommonNotifications();
  const updateLocalBookmarks = addBookmark(userBookmarksVar);

  const createBookmark = create({
    create: muationFn,
    success,
    error,
    updateLocalBookmarks,
  });

  return { createBookmark, loading };
}

export default useCreateBookmark;
