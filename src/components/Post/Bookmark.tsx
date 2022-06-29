import { Button, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IoBookmarkOutline, IoBookmarksOutline } from 'react-icons/io5';

import { Bookmark, UpdateBookmarksInCacheParams } from 'types';
import { useCreateBookmark } from 'operations';
import { useReactiveVar } from '@apollo/client';
import { userBookmarksVar, userIdVar } from 'lib';

const useStyles = createStyles((theme) => ({
  fontSize: {
    fontSize: '20px',
  },
}));

type Props = {
  postId: string;
};

function updateCache({ cache, newBookmarks }: UpdateBookmarksInCacheParams) {}

const checkBookmark = (postId: string, bookmarks: Array<Bookmark>) => {
  const post =
    bookmarks && bookmarks.length
      ? bookmarks.find(({ id }) => id === postId)
      : null;

  return !!post;
};

function Bookmark({ postId }: Props) {
  const { classes } = useStyles();
  const modals = useModals();
  const { createBookmark, loading: createBookmarkLoading } =
    useCreateBookmark();
  const isLoading = createBookmarkLoading;

  const userId = useReactiveVar(userIdVar);
  const bookmarks = useReactiveVar(userBookmarksVar);
  const isPostBookmarked = checkBookmark(postId, bookmarks);

  const onBookmarkClick = async () => {
    if (!userId) {
      modals.openContextModal('LOGIN', { innerProps: {} });

      return;
    }

    if (!isPostBookmarked) {
      await createBookmark({ postId });
    }
  };

  const handleOnClick = (e: React.MouseEvent, callback: () => void) => {
    callback();

    e.stopPropagation();
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

export default Bookmark;
