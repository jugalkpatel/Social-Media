import { ApolloError } from '@apollo/client';

import {
  useFetchCommunityMembersQuery,
  FetchCommunityMembersQuery,
} from 'operations';

type Props = {
  title: string;
};

function setState(data: FetchCommunityMembersQuery, error: ApolloError) {
  if (
    data &&
    data?.fetchCommunity &&
    data.fetchCommunity.__typename === 'Community'
  ) {
    return { members: data.fetchCommunity.members, state: 'DATA' };
  }

  if (
    (data &&
      data?.fetchCommunity &&
      data.fetchCommunity.__typename === 'CommonError') ||
    error
  ) {
    return { members: [], state: 'ERROR' };
  }

  return { members: [], state: 'LOADING' };
}

function useCommunityMembers({ title }: Props) {
  const { data, error } = useFetchCommunityMembersQuery({
    variables: { name: title },
    fetchPolicy: 'cache-first',
  });

  const { members, state } = setState(data, error);

  return { members, state };
}

export default useCommunityMembers;
