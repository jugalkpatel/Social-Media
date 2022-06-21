import { ApolloError } from '@apollo/client';

import {
  useFetchUserCommunitiesQuery,
  FetchUserCommunitiesQuery,
} from 'operations';
import { State } from 'types';

function setState(data: FetchUserCommunitiesQuery, error: ApolloError) {
  if (data && data?.fetchUser && data.fetchUser.__typename === 'User') {
    return {
      communities: data.fetchUser.joinedCommunities,
      state: 'DATA' as State,
    };
  }

  if (
    (data && data?.fetchUser && data.fetchUser.__typename === 'CommonError') ||
    error
  ) {
    return { communities: null, state: 'ERROR' as State };
  }

  return { communities: null, state: 'LOADING' as State };
}

function useFetchUserCommunities() {
  const { data, error } = useFetchUserCommunitiesQuery();

  const { communities, state } = setState(data, error);

  return { communities, state };
}

export default useFetchUserCommunities;
