import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useModals } from '@mantine/modals';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';

import {
  useAuthenticateMutation,
  AuthenticateMutationFn,
} from './__generated__/authenticate.generated';
import {
  RefreshMutationFn,
  useRefreshMutation,
} from '../../graphql/refresh/__generated__/refresh.generated';
import {
  setAuthCredentials,
  authorizationVar,
  userNameVar,
  userPictureVar,
  isTokenExpired,
} from 'lib';

async function handleRequest(
  access: AuthenticateMutationFn,
  refresh: RefreshMutationFn,
) {
  try {
    const { data } = await access();

    // handle message case;

    return data;
  } catch (error) {
    console.log(`error in access token ${error}`);
    if (error instanceof ApolloError) {
      const expired = isTokenExpired(error);

      if (expired) {
        await refresh();

        const { data } = await access();

        return data;
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

      const { authenticate } = response;
      if (authenticate && authenticate.__typename === 'AuthPayload') {
        const {
          user: { id, name, picture },
        } = authenticate;

        setAuthCredentials({ id, name, isLoggedIn: true, picture });
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
