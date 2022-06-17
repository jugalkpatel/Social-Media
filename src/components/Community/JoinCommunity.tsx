import { Button, createStyles, Skeleton } from '@mantine/core';
import { useReactiveVar } from '@apollo/client';

import { userIdVar } from 'lib';
import { useOpenConfirmModal } from 'hooks';
import {
  useCommunityMembers,
  useJoinCommunity,
  useLeaveCommunity,
} from 'operations';

type Props = {
  fullWidth?: boolean;
  data: {
    communityId: string;
    title: string;
  };
};

const useStyles = createStyles((theme) => ({
  align: {
    textAlign: 'center',
    [theme.fn.largerThan('sm')]: {
      textAlign: 'start',
    },
  },
}));

function JoinCommunity({ data: { communityId, title }, fullWidth }: Props) {
  const { classes } = useStyles();
  const userId = useReactiveVar(userIdVar);
  const { members, state } = useCommunityMembers({ title });
  const { join, loading: joinOperationLoading } = useJoinCommunity({
    id: communityId,
    title,
  });
  const { leave, loading: leaveOperationLoading } = useLeaveCommunity({
    id: communityId,
    title,
  });
  const isAuthenticated = !!userId;
  const isUserInCommunity = members.length
    ? !!members.find(({ id }) => id === userId)
    : false;

  console.log({ isUserInCommunity });

  const onLeaveClick = useOpenConfirmModal({
    data: {
      title: 'Are you sure, you want to leave this community?',
      labels: { confirm: 'leave', cancel: 'stay' },
      onCancel: () => null,
      onConfirm: () => leave(),
    },
  });

  if (state === 'ERROR' || !isAuthenticated) {
    return null;
  }

  return (
    <Skeleton
      visible={state === 'LOADING'}
      className={classes.align}
      sx={{ width: fullWidth ? null : 'fit-content' }}
    >
      <Button
        size="sm"
        radius="xl"
        px={'1.5rem'}
        fullWidth={true}
        loading={joinOperationLoading || leaveOperationLoading}
        variant={isUserInCommunity ? 'outline' : 'filled'}
        onClick={
          isAuthenticated && !isUserInCommunity
            ? () => join()
            : () => onLeaveClick()
        }
      >
        {isAuthenticated && isUserInCommunity ? 'leave' : 'join'}
      </Button>
    </Skeleton>
  );
}

export default JoinCommunity;
