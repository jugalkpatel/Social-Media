import {
  Popular,
  PopularTopPosts,
  PopularNewPosts,
  FeedLayout,
} from 'components';

function PopularFeed() {
  return (
    <FeedLayout>
      <Popular byVotes={<PopularTopPosts />} byTime={<PopularNewPosts />} />
    </FeedLayout>
  );
}

export default PopularFeed;
