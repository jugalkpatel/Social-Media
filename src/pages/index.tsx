import type { NextPage } from 'next';

import { UserFeed } from 'components';
import { withAuth } from 'lib';

const UserFeedWithAuth = withAuth(UserFeed);

const IndexPage: NextPage = () => {
  return <UserFeedWithAuth />;
};

export default IndexPage;
