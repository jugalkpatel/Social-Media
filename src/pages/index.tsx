import type { NextPage } from 'next';

import { AuthWrapper, UserFeed } from 'components';

const IndexPage: NextPage = () => {
  return (
    <AuthWrapper>
      <UserFeed />;
    </AuthWrapper>
  );
};

export default IndexPage;
