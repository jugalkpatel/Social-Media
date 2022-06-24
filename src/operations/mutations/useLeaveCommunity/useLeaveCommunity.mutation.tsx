import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import {
  useLeaveCommunityMutation,
  LeaveCommunityMutationFn,
  FetchCommunityMembersDocument,
  FetchCommunityMembersQuery,
  FetchCommunityMembersQueryVariables,
} from 'operations';

type Props = {
  id: string;
  title: string;
};

const onLeaveCommunityClick = async (
  leave: LeaveCommunityMutationFn,
  title: string,
) => {
  try {
    await leave({
      update: (cache, { data: { leaveCommunity } }) => {
        if (leaveCommunity.__typename === 'CommonError') {
          throw new Error(leaveCommunity.message);
        }

        if (leaveCommunity.__typename === 'Community') {
          const { members: updatedMembers } = leaveCommunity;

          const { fetchCommunity } = cache.readQuery<
            FetchCommunityMembersQuery,
            FetchCommunityMembersQueryVariables
          >({
            query: FetchCommunityMembersDocument,
            variables: { name: title },
          });

          if (fetchCommunity.__typename === 'Community') {
            cache.writeQuery<
              FetchCommunityMembersQuery,
              FetchCommunityMembersQueryVariables
            >({
              query: FetchCommunityMembersDocument,
              variables: { name: title },
              data: {
                fetchCommunity: {
                  ...fetchCommunity,
                  members: updatedMembers,
                },
              },
            });

            showNotification({
              message: `Successfully left ${title}`,
              autoClose: 3000,
              icon: <IoMdCheckmark />,
              color: 'green',
            });

            return;
          }

          if (fetchCommunity.__typename === 'CommonError') {
            throw new Error(fetchCommunity.message);
          }
        }

        throw new Error();
      },
    });
  } catch (error) {
    console.log({ error });
    showNotification({
      message: error?.message || 'something went wrong!',
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });
  }
};

function useLeaveCommunity({ id, title }: Props) {
  const [mutationFn, { loading }] = useLeaveCommunityMutation({
    variables: { communityId: id },
  });

  const leave = () => onLeaveCommunityClick(mutationFn, title);

  return { leave, loading };
}

export default useLeaveCommunity;

// console.log({ fetchCommunity });

// if (fetchCommunity.__typename === 'Community') {
//   cache.writeQuery<FetchCommunityQuery>({
//     query: FetchCommunityDocument,
//     data: {
//       fetchCommunity: {
//         ...fetchCommunity,
//         members: updatedMembers,
//       },
//     },
//   });

//   showNotification({
//     message: `Successfully left ${title}`,
//     autoClose: 3000,
//     icon: <IoMdCheckmark />,
//     color: 'green',
//   });

//   return;
// }

// const { fetchCommunity } = cache.readQuery<
//   FetchCommunityQuery,
//   FetchCommunityQueryVariables
// >({
//   query: FetchCommunityDocument,
//   variables: { name: title },
// });
