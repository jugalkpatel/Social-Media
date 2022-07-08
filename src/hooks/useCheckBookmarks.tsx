import { useReactiveVar } from '@apollo/client';

import { userBookmarksVar } from 'lib';

function useCheckBookmarks() {
  const bookmarks = useReactiveVar(userBookmarksVar);

  const isBookmarked = (postId: string) => {
    const post =
      bookmarks && bookmarks.length
        ? bookmarks.find(({ id }) => id === postId)
        : null;

    return !!post;
  };

  return isBookmarked;
}

export default useCheckBookmarks;
