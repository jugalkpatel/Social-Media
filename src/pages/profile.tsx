import { NextPage } from 'next';

import { Profile } from 'components';
import { withAuth } from 'lib';

const ProfileWithAuth = withAuth(Profile);

const ProfilePage: NextPage = () => {
  return <ProfileWithAuth />;
};

export default ProfilePage;
