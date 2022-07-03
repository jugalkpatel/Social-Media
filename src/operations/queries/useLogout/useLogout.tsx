import { ApolloClient } from '@apollo/client';
import Router from 'next/router';

import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import { useLogoutMutation, LogoutMutationFn } from 'operations';
import { setAuthCredentials } from 'lib';

type LogoutParams = CommonNotificationParms & {
  logout: LogoutMutationFn;
  client: ApolloClient<object>;
};

function logoutUser({
  logout,
  success,
  error: showError,
  client,
}: LogoutParams) {
  return async () => {
    try {
      const { data } = await logout();

      if (data && data?.logout && data.logout.__typename === 'CommonError') {
        throw new Error(data.logout.message);
      }

      if (data && data?.logout && data.logout.__typename === 'Success') {
        client.clearStore();

        setAuthCredentials({
          isLoggedIn: false,
          bookmarks: [],
          id: '',
          joinedCommunities: [],
          name: '',
          picture: '',
        });

        Router.push('/popular');

        success('Logout Successfully');
        return;
      }

      throw new Error();
    } catch (error) {
      console.log({ error });
      const errorMessage = error?.message || 'something went wrong!';

      showError(errorMessage);
    }
  };
}

function useLogout() {
  const [mutationFn, { loading, client }] = useLogoutMutation();
  const { success, error } = useCommonNotifications();
  const logout = logoutUser({ logout: mutationFn, success, error, client });

  return { logout, loading };
}

export default useLogout;
