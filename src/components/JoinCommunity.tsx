import { Button, createStyles, Skeleton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { GET_COMMUNITY } from 'lib';
import { useOpenConfirmModal } from 'hooks';
import {
  useJoinCommunityMutation,
  JoinCommunityMutationFn,
} from '../graphql/join-community/__generated__/JoinCommunity.generated';
import {
  useLeaveCommunityMutation,
  LeaveCommunityMutationFn,
} from '../graphql/leave-community/__generated__/LeaveCommunity.generated';
import { GetCommunityQuery } from '../graphql/fetchCommity/__generated__/fetchCommity.generated';

type Props = {
  data: {
    isUserInCommunity: boolean;
    isAuthenticated: boolean;
    communityId: string;
    title: string;
    state: 'DATA' | 'LOADING' | 'ERROR';
  };
};

const useStyles = createStyles((theme) => ({
  align: {
    textAlign: 'center',
    [theme.fn.largerThan('sm')]: {
      textAlign: 'start',
    },
  },
  width: {
    width: 'fit-content',
  },
}));

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
          const { id } = JoinCommunity;

          const { GetCommunity } = cache.readQuery<GetCommunityQuery>({
            query: GET_COMMUNITY,
            variables: { name: title },
          });

          if (GetCommunity.__typename === 'GetCommunityResult') {
            const { members } = GetCommunity;

            cache.writeQuery<GetCommunityQuery>({
              query: GET_COMMUNITY,
              data: {
                GetCommunity: {
                  ...GetCommunity,
                  members: [...members, { id }],
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

          if (GetCommunity.__typename === 'CommunityError') {
            throw new Error(GetCommunity.message);
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

          const { GetCommunity } = cache.readQuery<GetCommunityQuery>({
            query: GET_COMMUNITY,
            variables: { name: title },
          });

          if (GetCommunity.__typename === 'GetCommunityResult') {
            const { members } = GetCommunity;

            cache.writeQuery<GetCommunityQuery>({
              query: GET_COMMUNITY,
              data: {
                GetCommunity: {
                  ...GetCommunity,
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

          if (GetCommunity.__typename === 'CommunityError') {
            throw new Error(GetCommunity.message);
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

function JoinCommunity({
  data: { isUserInCommunity, isAuthenticated, communityId, title, state },
}: Props) {
  const { classes, cx } = useStyles();
  const [join, { loading }] = useJoinCommunityMutation({
    variables: { communityId },
  });
  const [leave, { loading: leaveOperationLoading }] = useLeaveCommunityMutation(
    {
      variables: { communityId },
    },
  );

  const onLeaveClick = useOpenConfirmModal({
    data: {
      title: 'Are you sure, you want to leave this community?',
      labels: { confirm: 'leave', cancel: 'stay' },
      onCancel: () => null,
      onConfirm: () => onLeaveCommunityClick(leave, title),
    },
  });

  if (state === 'ERROR' || !isAuthenticated) {
    return null;
  }

  return (
    <Skeleton
      visible={state === 'LOADING'}
      className={cx(classes.align, classes.width)}
      sx={{ width: 'fit-content' }}
    >
      <Button
        size="sm"
        radius="xl"
        px={'1.5rem'}
        loading={loading || leaveOperationLoading}
        variant={isUserInCommunity ? 'outline' : 'filled'}
        onClick={
          isAuthenticated && !isUserInCommunity
            ? () => onJoinCommunityClick(join, title)
            : () => onLeaveClick()
        }
      >
        {isAuthenticated && isUserInCommunity ? 'leave' : 'join'}
      </Button>
    </Skeleton>
  );
}

export default JoinCommunity;
