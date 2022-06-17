import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import {
  useJoinCommunityMutation,
  JoinCommunityMutationFn,
} from '../../graphql-generated/join-community/__generated__/JoinCommunity.generated';
import {
  FetchCommunityQuery,
  FetchCommunityDocument,
  FetchCommunityQueryVariables,
} from '../../graphql-generated/fetch-community/__generated__/fetchCommunity.generated';

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
      update: (cache, { data: { JoinCommunity } }) => {
        if (JoinCommunity.__typename === 'CommunityError') {
          throw new Error(JoinCommunity.message);
        }

        if (JoinCommunity.__typename === 'IJoinCommunityMember') {
          const { id: userId } = JoinCommunity;

          const { fetchCommunity } = cache.readQuery<
            FetchCommunityQuery,
            FetchCommunityQueryVariables
          >({
            query: FetchCommunityDocument,
            variables: { name: title },
          });

          if (
            fetchCommunity &&
            fetchCommunity.__typename === 'FetchCommunityResult'
          ) {
            const { members } = fetchCommunity;

            cache.writeQuery<FetchCommunityQuery>({
              query: FetchCommunityDocument,
              data: {
                fetchCommunity: {
                  ...fetchCommunity,
                  members: [...members, { id: userId }],
                },
              },
            });

            showNotification({
              message: `successfully joined ${title}`,
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

function useJoinCommunity({ id, title }: Props) {
  const [mutationFunc, { loading }] = useJoinCommunityMutation({
    variables: { communityId: id },
  });

  const join = () => onJoinCommunityClick(mutationFunc, title);

  return { join, loading };
}

export default useJoinCommunity;
