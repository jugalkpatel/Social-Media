import { FeedLayout } from 'components';
import { Popular, PopularTopPosts, PopularNewPosts } from 'components';

function Feed() {
  return (
    <FeedLayout
      popular={
        <Popular byVotes={<PopularTopPosts />} byTime={<PopularNewPosts />} />
      }
    />
  );
}

export default Feed;
