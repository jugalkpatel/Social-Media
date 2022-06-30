import {
  Personalised,
  FeedLayout,
  PersonalisedNewPosts,
  PersonalisedTopPosts,
  FeaturedCommunities,
} from 'components';

function UserFeed() {
  return (
    <FeedLayout
      main={
        <Personalised
          byTime={<PersonalisedNewPosts />}
          byVotes={<PersonalisedTopPosts />}
        />
      }
      featured={<FeaturedCommunities />}
    />
  );
}

export default UserFeed;
