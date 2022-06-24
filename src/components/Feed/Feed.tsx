import { FeedLayout } from 'components';
import { Popular } from 'components';

function Feed() {
  return <FeedLayout popular={<Popular />} />;
}

export default Feed;
