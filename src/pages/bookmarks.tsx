import type { NextPage } from 'next';

import { AuthWrapper, BookmarkPosts, ContainerLayout } from 'components';

const BookmarksPage: NextPage = () => {
  return (
    <ContainerLayout>
      {/* <AuthWrapper> */}
      <BookmarkPosts />
      {/* </AuthWrapper> */}
    </ContainerLayout>
  );
};

export default BookmarksPage;
