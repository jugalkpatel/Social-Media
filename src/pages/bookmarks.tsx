import type { NextPage } from 'next';

import { BookmarkPosts } from 'components';
import { withAuth } from 'lib';

const BookmarksPageWithAuth = withAuth(BookmarkPosts);

const BookmarksPage: NextPage = () => {
  return <BookmarksPageWithAuth />;
};

export default BookmarksPage;
