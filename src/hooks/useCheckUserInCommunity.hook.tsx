import { useReactiveVar } from '@apollo/client';
import { userCommunitiesVar } from 'lib';

function useCheckUserInCommunity({ communityId }: { communityId: string }) {
  const joinedCommunities = useReactiveVar(userCommunitiesVar);

  const isUserInCommunity =
    joinedCommunities && joinedCommunities.length
      ? !!joinedCommunities.find(({ id }) => id === communityId)
      : false;

  return { isUserInCommunity };
}

export default useCheckUserInCommunity;
