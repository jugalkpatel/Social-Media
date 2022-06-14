import { useReactiveVar } from '@apollo/client';
import { userIdVar } from 'lib';
import { useCommunityMembers } from 'operations';

function useCheckUserInCommunity({ title }: { title: string }) {
  const userId = useReactiveVar(userIdVar);
  const { members } = useCommunityMembers({ title });

  const isUserInCommunity =
    members.length && userId
      ? !!members.find(({ id }) => id === userId)
      : false;

  return { isUserInCommunity };
}

export default useCheckUserInCommunity;
