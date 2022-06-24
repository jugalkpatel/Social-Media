import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import {
  FetchCommunityMembersQuery,
  FetchCommunityMembersQueryVariables,
  JoinCommunityMutationFn,
  FetchCommunityMembersDocument,
  useJoinCommunityMutation,
} from 'operations';
import { FetchCommunityDocument } from 'graphql-generated';

type Props = {
  id: string;
  title: string;
};

const onJoinCommunityClick = async (
  join: JoinCommunityMutationFn,
  title: string,
) => {
  try {
    await join({
      update: (cache, { data: { joinCommunity } }) => {
        if (joinCommunity.__typename === 'CommonError') {
          throw new Error(joinCommunity.message);
        }

        if (joinCommunity.__typename === 'Community') {
          const { members: updatedMembers } = joinCommunity;

          const { fetchCommunity } = cache.readQuery<
            FetchCommunityMembersQuery,
            FetchCommunityMembersQueryVariables
          >({
            query: FetchCommunityMembersDocument,
            variables: { name: title },
          });

          if (fetchCommunity.__typename === 'Community') {
            cache.writeQuery<FetchCommunityMembersQuery>({
              query: FetchCommunityMembersDocument,
              data: {
                fetchCommunity: {
                  ...fetchCommunity,
                  members: updatedMembers,
                },
              },
            });

            showNotification({
              message: `successfully joined ${title}`,
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

function useJoinCommunity({ id, title }: Props) {
  const [mutationFunc, { loading }] = useJoinCommunityMutation({
    variables: { communityId: id },
  });

  const join = () => onJoinCommunityClick(mutationFunc, title);

  return { join, loading };
}

export default useJoinCommunity;
