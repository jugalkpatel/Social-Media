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
  title: string;
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

// const onLeaveCommunityClick = async (
//   leave: LeaveCommunityMutationFn,
//   title: string,
// ) => {
//   try {
//     await leave({
//       update: (cache, { data: { leaveCommunity } }) => {
//         if (leaveCommunity.__typename === 'CommonError') {
//           throw new Error(leaveCommunity.message);
//         }

//         if (leaveCommunity.__typename === 'Community') {
//           const { members: updatedMembers } = leaveCommunity;

//           const { fetchCommunity } = cache.readQuery<
//             FetchCommunityMembersQuery,
//             FetchCommunityMembersQueryVariables
//           >({
//             query: FetchCommunityMembersDocument,
//             variables: { name: title },
//           });

//           if (fetchCommunity.__typename === 'Community') {
//             cache.writeQuery<
//               FetchCommunityMembersQuery,
//               FetchCommunityMembersQueryVariables
//             >({
//               query: FetchCommunityMembersDocument,
//               variables: { name: title },
//               data: {
//                 fetchCommunity: {
//                   ...fetchCommunity,
//                   members: updatedMembers,
//                 },
//               },
//             });

//             showNotification({
//               message: `Successfully left ${title}`,
//               autoClose: 3000,
//               icon: <IoMdCheckmark />,
//               color: 'green',
//             });

//             return;
//           }

//           if (fetchCommunity.__typename === 'CommonError') {
//             throw new Error(fetchCommunity.message);
//           }
//         }

//         throw new Error();
//       },
//     });
//   } catch (error) {
//     console.log({ error });
//     showNotification({
//       message: error?.message || 'something went wrong!',
//       autoClose: 3000,
//       icon: <IoMdClose />,
//       color: 'red',
//     });
//   }
// };

function useLeaveCommunity({ id, title }: Props) {
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
