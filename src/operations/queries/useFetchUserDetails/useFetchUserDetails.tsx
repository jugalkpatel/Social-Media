import { ApolloError } from '@apollo/client';

import { State } from 'types';
import { useFetchUserQuery, FetchUserQuery } from 'operations';
import { useEffect } from 'react';

function setState(data: FetchUserQuery, isError: ApolloError) {
  if (
    (data && data?.fetchUser && data.fetchUser.__typename === 'CommonError') ||
    isError
  ) {
    return { user: null, state: 'ERROR' as State };
  }

  if (data && data?.fetchUser && data.fetchUser.__typename === 'User') {
    return { user: data.fetchUser, state: 'DATA' as State };
  }

  return { user: null, state: 'LOADING' as State };
}

function useFetchUserDetails() {
  const { data, error, refetch } = useFetchUserQuery();

  const { user, state } = setState(data, error);

  useEffect(() => {
    if (state === 'DATA') {
      refetch();
    }
  }, []);

  return { user, state };
}

export default useFetchUserDetails;
