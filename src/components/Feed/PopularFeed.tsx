import {
  Popular,
  PopularTopPosts,
  PopularNewPosts,
  FeedLayout,
  FeaturedCommunities,
} from 'components';

function PopularFeed() {
  return (
    <FeedLayout
      main={
        <Popular byVotes={<PopularTopPosts />} byTime={<PopularNewPosts />} />
      }
      featured={<FeaturedCommunities />}
    />
  );
}

export default PopularFeed;
