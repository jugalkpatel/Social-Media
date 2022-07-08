import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import {
  useLeaveCommunityMutation,
  LeaveCommunityMutationFn,
  FetchCommunityMembersDocument,
  FetchCommunityMembersQuery,
  FetchCommunityMembersQueryVariables,
} from 'operations';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import { ReactiveVar } from '@apollo/client';
import { UpdateCacheOnCommunityOperation, UserCommunity } from 'types';
import { userCommunitiesVar } from 'lib';

type Props = {
  id: string;
};

type LeaveCommunityParams = CommonNotificationParms & {
  leave: LeaveCommunityMutationFn;
  updateLocalCommunities: (communityId: string) => void;
};

type LeaveParams = {
  title: string;
  communityId: string;
  updateCache: (args: UpdateCacheOnCommunityOperation) => void;
};

function removeCommunity(userCommunitiesFunc: ReactiveVar<UserCommunity[]>) {
  const existingCommunities = userCommunitiesFunc();

  return (communityId: string) => {
    userCommunitiesFunc(
      existingCommunities.filter(({ id }) => id !== communityId),
    );
  };
}

function leaveCommunity({
  leave,
  success,
  error: showError,
  updateLocalCommunities,
}: LeaveCommunityParams) {
  return async ({ communityId, title, updateCache }: LeaveParams) => {
    try {
      await leave({
        variables: { communityId },
        update: (cache, { data: { leaveCommunity } }) => {
          if (leaveCommunity.__typename === 'CommonError') {
            throw new Error(leaveCommunity.message);
          }

          if (leaveCommunity.__typename === 'Community') {
            const { id, members } = leaveCommunity;

            updateLocalCommunities(id);

            updateCache({ cache, title, updatedCommunityMembers: members });

            success(`Successfully left ${title}`);

            return;
          }

          throw new Error();
        },
      });
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong!';
      showError(errorMessage);
    }
  };
}

function useLeaveCommunity({ id }: Props) {
  const [mutationFunc, { loading }] = useLeaveCommunityMutation({
    variables: { communityId: id },
  });
  const { success, error } = useCommonNotifications();
  const updateLocalCommunities = removeCommunity(userCommunitiesVar);

  const leave = leaveCommunity({
    leave: mutationFunc,
    success,
    error,
    updateLocalCommunities,
  });

  return { leave, loading };
}

export default useLeaveCommunity;
