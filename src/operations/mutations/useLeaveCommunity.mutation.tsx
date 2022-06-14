import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import {
  useLeaveCommunityMutation,
  LeaveCommunityMutationFn,
} from 'graphql/leave-community/__generated__/LeaveCommunity.generated';
import {
  FetchCommunityQuery,
  FetchCommunityDocument,
  FetchCommunityQueryVariables,
} from '../../graphql/fetch-community/__generated__/fetchCommunity.generated';

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
        if (leaveCommunity.__typename === 'CommunityError') {
          throw new Error(leaveCommunity.message);
        }

        if (leaveCommunity.__typename === 'IJoinCommunityMember') {
          const { id: userId } = leaveCommunity;

          const { fetchCommunity } = cache.readQuery<
            FetchCommunityQuery,
            FetchCommunityQueryVariables
          >({
            query: FetchCommunityDocument,
            variables: { name: title },
          });

          if (fetchCommunity.__typename === 'FetchCommunityResult') {
            const { members } = fetchCommunity;

            cache.writeQuery<FetchCommunityQuery>({
              query: FetchCommunityDocument,
              data: {
                fetchCommunity: {
                  ...fetchCommunity,
                  members: members.filter(({ id }) => id !== userId),
                },
              },
            });

            showNotification({
              message: `Successfully left ${title}`,
              autoClose: 3000,
              icon: <IoMdCheckmark />,
              color: 'green',
            });
          }

          if (fetchCommunity.__typename === 'CommunityError') {
            throw new Error(fetchCommunity.message);
          }
        }
      },
    });
  } catch (error) {
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
