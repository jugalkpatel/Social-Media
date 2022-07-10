import { useReactiveVar } from '@apollo/client';
import { Button, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IoBookmarkOutline, IoBookmarksOutline } from 'react-icons/io5';

import { Bookmark, UpdateBookmarksInCacheParams } from 'types';
import {
  FetchUserBookmarksDocument,
  FetchUserBookmarksQuery,
  FetchUserBookmarksQueryVariables,
  useCreateBookmark,
  useRemoveBookmark,
} from 'operations';
import { NO_OF_POSTS_AT_A_TIME, userBookmarksVar, userIdVar } from 'lib';

const useStyles = createStyles((theme) => ({
  fontSize: {
    fontSize: '20px',
  },
}));

type Props = {
  postId: string;
};

const checkBookmark = (postId: string, bookmarks: Array<Bookmark>) => {
  const post =
    bookmarks && bookmarks.length
      ? bookmarks.find(({ id }) => id === postId)
      : null;

  return !!post;
};

const handleOnClick = (e: React.MouseEvent, callback: () => void) => {
  callback();

  e.stopPropagation();
};

function Bookmark({ postId }: Props) {
  const { classes } = useStyles();
  const modals = useModals();
  const { createBookmark, loading: createBookmarkLoading } =
    useCreateBookmark();
  const { deleteBookmark, loading: removeBookmarkLoading } =
    useRemoveBookmark();
  const isLoading = createBookmarkLoading || removeBookmarkLoading;

  const userId = useReactiveVar(userIdVar);
  const bookmarks = useReactiveVar(userBookmarksVar);
  const isPostBookmarked = checkBookmark(postId, bookmarks);

  const onBookmarkClick = async () => {
    if (!userId) {
      modals.openContextModal('LOGIN', { innerProps: {} });

      return;
    }

    if (!isPostBookmarked) {
      createBookmark({ postId, updateCache: updateCacheOnCreate });
    } else {
      deleteBookmark({ postId, updateCache: updateCacheOnRemove });
    }
  };

  return (
    <Button
      leftIcon={
        isPostBookmarked ? (
          <IoBookmarksOutline className={classes.fontSize} />
        ) : (
          <IoBookmarkOutline className={classes.fontSize} />
        )
      }
      variant="subtle"
      color="gray"
      px="sm"
      size="xs"
      sx={{ color: 'gray' }}
      onClick={(e: React.MouseEvent) => handleOnClick(e, onBookmarkClick)}
      loading={isLoading}
    >
      {isPostBookmarked ? 'Saved' : 'Save'}
    </Button>
  );
}

function updateCacheOnCreate({
  cache,
  bookmark: newBookmark,
}: UpdateBookmarksInCacheParams) {
  const data = cache.readQuery<
    FetchUserBookmarksQuery,
    FetchUserBookmarksQueryVariables
  >({
    query: FetchUserBookmarksDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchUserBookmarks;

    if (posts && posts.length) {
      cache.writeQuery<
        FetchUserBookmarksQuery,
        FetchUserBookmarksQueryVariables
      >({
        query: FetchUserBookmarksDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchUserBookmarks: {
            ...data.fetchUserBookmarks,
            posts: data.fetchUserBookmarks.posts.concat(newBookmark),
          },
        },
        overwrite: true,
      });

      return;
    }
  }

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchUserBookmarks.message);
  }
}

function updateCacheOnRemove({
  cache,
  bookmark: deletedBookmark,
}: UpdateBookmarksInCacheParams) {
  const data = cache.readQuery<
    FetchUserBookmarksQuery,
    FetchUserBookmarksQueryVariables
  >({
    query: FetchUserBookmarksDocument,
    variables: { take: NO_OF_POSTS_AT_A_TIME },
  });

  if (
    data &&
    data?.fetchUserBookmarks &&
    data?.fetchUserBookmarks.__typename === 'BatchPosts'
  ) {
    const { posts } = data.fetchUserBookmarks;

    if (posts && posts.length) {
      cache.writeQuery<
        FetchUserBookmarksQuery,
        FetchUserBookmarksQueryVariables
      >({
        query: FetchUserBookmarksDocument,
        variables: { take: NO_OF_POSTS_AT_A_TIME },
        data: {
          fetchUserBookmarks: {
            ...data.fetchUserBookmarks,
            posts: data.fetchUserBookmarks.posts.filter(
              ({ id }) => id !== deletedBookmark.id,
            ),
          },
        },
        overwrite: true,
      });

      return;
    }
  }

  if (
    data &&
    data?.fetchUserBookmarks &&
    data.fetchUserBookmarks.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchUserBookmarks.message);
  }
}

export default Bookmark;
