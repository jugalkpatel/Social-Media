import { Button, Stack } from '@mantine/core';
import { useReactiveVar } from '@apollo/client';
import { useModals } from '@mantine/modals';

import { UpdateCacheOnCommunityOperation } from 'types';
import { useOpenConfirmModal, useCheckUserInCommunity } from 'hooks';
import {
  FetchCommunityMembersDocument,
  FetchCommunityMembersQuery,
  FetchCommunityMembersQueryVariables,
  useJoinCommunity,
  useLeaveCommunity,
} from 'operations';
import { userIdVar } from 'lib';

type Props = {
  fullWidth?: boolean;
  data: {
    communityId: string;
    title: string;
  };
};

function JoinCommunity({ data: { communityId, title }, fullWidth }: Props) {
  const userId = useReactiveVar(userIdVar);
  const modals = useModals();
  const { join, loading: joinOperationLoading } = useJoinCommunity({
    id: communityId,
  });
  const { leave, loading: leaveOperationLoading } = useLeaveCommunity({
    id: communityId,
  });
  const isAuthenticated = !!userId;
  const { isUserInCommunity } = useCheckUserInCommunity({ communityId });
  const onLeaveClick = useOpenConfirmModal({
    data: {
      title: 'Are you sure, you want to leave this community?',
      labels: { confirm: 'leave', cancel: 'stay' },
      onCancel: () => null,
      onConfirm: () =>
        leave({ title, communityId, updateCache: updateCacheOnLeave }),
    },
  });

  const handleClick = async () => {
    if (!isAuthenticated) {
      modals.openContextModal('LOGIN', { innerProps: {} });

      return;
    }

    if (!isUserInCommunity) {
      join({ title, updateCache: updateCacheOnJoin, communityId });
    } else {
      onLeaveClick();
    }
  };

  return (
    <Stack sx={{ width: fullWidth ? null : 'fit-content' }}>
      <Button
        size="xs"
        radius="xl"
        px={'1.5rem'}
        fullWidth={true}
        loading={joinOperationLoading || leaveOperationLoading}
        variant={isUserInCommunity ? 'outline' : 'filled'}
        onClick={handleClick}
      >
        {isAuthenticated && isUserInCommunity ? 'leave' : 'join'}
      </Button>
    </Stack>
  );
}

function updateCacheOnJoin({
  title,
  cache,
  updatedCommunityMembers,
}: UpdateCacheOnCommunityOperation) {
  const data = cache.readQuery<
    FetchCommunityMembersQuery,
    FetchCommunityMembersQueryVariables
  >({
    query: FetchCommunityMembersDocument,
    variables: { name: title },
  });

  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchCommunity.message);
  }

  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'Community'
  ) {
    cache.writeQuery<
      FetchCommunityMembersQuery,
      FetchCommunityMembersQueryVariables
    >({
      query: FetchCommunityMembersDocument,
      variables: { name: title },
      data: {
        fetchCommunity: {
          ...data.fetchCommunity,
          members: updatedCommunityMembers,
        },
      },
      overwrite: true,
    });

    return;
  }
}

function updateCacheOnLeave({
  cache,
  title,
  updatedCommunityMembers,
}: UpdateCacheOnCommunityOperation) {
  const data = cache.readQuery<
    FetchCommunityMembersQuery,
    FetchCommunityMembersQueryVariables
  >({
    query: FetchCommunityMembersDocument,
    variables: { name: title },
  });

  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'CommonError'
  ) {
    throw new Error(data.fetchCommunity.message);
  }

  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'Community'
  ) {
    cache.writeQuery<
      FetchCommunityMembersQuery,
      FetchCommunityMembersQueryVariables
    >({
      query: FetchCommunityMembersDocument,
      variables: { name: title },
      data: {
        fetchCommunity: {
          ...data.fetchCommunity,
          members: updatedCommunityMembers,
        },
      },
      overwrite: true,
    });

    return;
  }
}

export default JoinCommunity;
