import {
  Personalised,
  FeedLayout,
  PersonalisedNewPosts,
  PersonalisedTopPosts,
} from 'components';

function UserFeed() {
  return (
    <FeedLayout>
      <Personalised
        byTime={<PersonalisedNewPosts />}
        byVotes={<PersonalisedTopPosts />}
      />
    </FeedLayout>
  );
}

export default UserFeed;
