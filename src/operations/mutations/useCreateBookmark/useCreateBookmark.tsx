import { Bookmark, UpdateBookmarksInCacheParams } from 'types';
import { userBookmarksVar } from 'lib';
import {
  useCreateBookmarkMutation,
  CreateBookmarkMutationFn,
} from 'operations';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';

type CreateParams = CommonNotificationParms & {
  create: CreateBookmarkMutationFn;
  updateLocalBookmarks: (args: Array<Bookmark>) => void;
};

type CreateBookmarkParams = {
  postId: string;
  //   updateCache: (args: UpdateBookmarksInCacheParams) => void;
};

function create({
  create,
  error: showError,
  updateLocalBookmarks,
}: CreateParams) {
  return async ({ postId }: CreateBookmarkParams) => {
    try {
      await create({
        variables: { postId },
        update: (cache, { data: { createBookmark } }) => {
          if (createBookmark.__typename === 'CommonError') {
            throw new Error(createBookmark.message);
          }

          if (createBookmark.__typename === 'User') {
            const { bookmarks } = createBookmark;

            updateLocalBookmarks(bookmarks);

            // updateCache({ cache, newBookmarks: bookmarks });

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

function useCreateBookmark() {
  const [muationFn, { loading }] = useCreateBookmarkMutation();
  const { success, error } = useCommonNotifications();

  const createBookmark = create({
    create: muationFn,
    success,
    error,
    updateLocalBookmarks: (newBookmarks: Array<Bookmark>) =>
      userBookmarksVar(newBookmarks),
  });

  return { createBookmark, loading };
}

// create a function that adds return a function that takes, cache update function and postid
// a function that accepts new array of bookmarks and set it.

export default useCreateBookmark;
