import { CreatePost } from 'components';

import { withAuth } from 'lib';

const SubmitWithAuth = withAuth(CreatePost);

function Submit() {
  return <SubmitWithAuth />;
}
export default Submit;
