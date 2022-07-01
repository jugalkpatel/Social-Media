import { ReactiveVar } from '@apollo/client';

import { UserCommunity, UpdateCacheOnCommunityOperation } from 'types';
import { JoinCommunityMutationFn, useJoinCommunityMutation } from 'operations';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import { userCommunitiesVar } from 'lib';

type Props = {
  id: string;
};

type JoinCommunityParams = CommonNotificationParms & {
  join: JoinCommunityMutationFn;
  updateLocalCommunities: (newCommunity: UserCommunity) => void;
};

type JoinParams = {
  title: string;
  updateCache: (args: UpdateCacheOnCommunityOperation) => void;
  communityId: string;
};

function addCommunity(userCommunitiesFunc: ReactiveVar<UserCommunity[]>) {
  const existingCommunities = userCommunitiesFunc();

  return (newCommunity: UserCommunity) => {
    userCommunitiesFunc(existingCommunities.concat(newCommunity));
  };
}

function joinCommunity({
  join,
  success,
  error: showError,
  updateLocalCommunities,
}: JoinCommunityParams) {
  return async ({ title, communityId, updateCache }: JoinParams) => {
    try {
      await join({
        variables: { communityId },
        update: (cache, { data: { joinCommunity } }) => {
          if (joinCommunity.__typename === 'CommonError') {
            throw new Error(joinCommunity.message);
          }

          if (joinCommunity.__typename === 'Community') {
            const { id, members } = joinCommunity;

            updateLocalCommunities({ __typename: 'Community', id });

            updateCache({ cache, title, updatedCommunityMembers: members });

            success(`Successfully joined ${title}`);

            return;
          }

          throw new Error();
        },
      });
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong';
      showError(errorMessage);
    }
  };
}

function useJoinCommunity({ id }: Props) {
  const [mutationFunc, { loading }] = useJoinCommunityMutation({
    variables: { communityId: id },
  });
  const { success, error } = useCommonNotifications();
  const updateLocalCommunities = addCommunity(userCommunitiesVar);

  const join = joinCommunity({
    join: mutationFunc,
    success,
    error,
    updateLocalCommunities,
  });

  return { join, loading };
}

export default useJoinCommunity;
