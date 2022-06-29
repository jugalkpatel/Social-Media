import { useEffect } from 'react';
import { useReactiveVar, ApolloError } from '@apollo/client';
import { useModals } from '@mantine/modals';
import { useRouter } from 'next/router';

import { useRefreshMutation, RefreshMutationFn } from 'graphql-generated';
import {
  useAuthenticateMutation,
  AuthenticateMutation,
  AuthenticateMutationFn,
} from 'operations';
import {
  setAuthCredentials,
  authorizationVar,
  userNameVar,
  userPictureVar,
  isTokenExpired,
} from 'lib';

const checkAccess = (data: AuthenticateMutation) => {
  if (data && data?.authenticate && data.authenticate.__typename === 'User') {
    return data;
  }

  throw new ApolloError({ errorMessage: 'access failed' });
};

async function handleRequest(
  access: AuthenticateMutationFn,
  refresh: RefreshMutationFn,
) {
  try {
    const { data } = await access();

    return checkAccess(data);
  } catch (error) {
    console.log(`error in access token ${error}`);
    if (error instanceof ApolloError) {
      const expired = isTokenExpired(error);

      if (expired) {
        const { data: refreshResponse } = await refresh();

        if (
          refreshResponse &&
          refreshResponse?.refresh &&
          refreshResponse.refresh.__typename === 'IRefresh'
        ) {
          const { data } = await access();

          return checkAccess(data);
        }
      }
    }

    throw new Error(error);
  }
}

function useAuth() {
  const isAuthorized = useReactiveVar(authorizationVar);
  const name = useReactiveVar(userNameVar);
  const picture = useReactiveVar(userPictureVar);
  const [access, { loading: authenticateLoading }] = useAuthenticateMutation();
  const [refresh, { loading: refreshLoading }] = useRefreshMutation();
  const router = useRouter();
  const modals = useModals();

  const checkAuthorization = async () => {
    try {
      const response = await handleRequest(access, refresh);

      if (
        response &&
        response?.authenticate &&
        response.authenticate.__typename === 'User'
      ) {
        const { id, name, picture, bookmarks } = response.authenticate;

        setAuthCredentials({ isLoggedIn: !!id, id, name, picture, bookmarks });

        return;
      }

      throw new Error('something went wrong!');
    } catch (error) {
      // router.push('/');
      // hits when refresh token throws error: refresh token expires
      // logout and redirect to the login modal
      modals.openContextModal('LOGIN', { innerProps: {} });
    }
  };

  // cases: all happy case: login check whether on refresh is working or not, cookies with long timeline
  // access expired case: check whether refresh token is working or not.
  // both token expired case: check what happened if both token expired; also redirect user to login if this is the case

  useEffect(() => {
    if (!isAuthorized) {
      checkAuthorization();
    }
  }, []);

  // console.log({ authenticateLoading, refreshLoading });

  return {
    data: { isAuthorized, name, picture },
    loading: authenticateLoading || refreshLoading,
  } as const;
}

export { useAuth };
