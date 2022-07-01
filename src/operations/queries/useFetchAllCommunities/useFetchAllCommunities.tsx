import { ApolloError } from '@apollo/client';

import { State } from 'types';
import {
  useFetchAllCommunitiesQuery,
  FetchAllCommunitiesQuery,
} from 'operations';

function setState(data: FetchAllCommunitiesQuery, isError: ApolloError) {
  if (
    (data &&
      data?.fetchAllCommunities &&
      data.fetchAllCommunities.__typename === 'CommonError') ||
    isError
  ) {
    return { communities: null, state: 'ERROR' as State };
  }

  if (
    data &&
    data?.fetchAllCommunities &&
    data.fetchAllCommunities.__typename === 'CommunityList'
  ) {
    return {
      communities: data.fetchAllCommunities.communities,
      state: 'DATA' as State,
    };
  }
  return { communities: null, state: 'LOADING' as State };
}

function useFetchAllCommunities() {
  const { data, error: isError } = useFetchAllCommunitiesQuery();

  const { communities, state } = setState(data, isError);

  return { communities, state };
}

export default useFetchAllCommunities;
