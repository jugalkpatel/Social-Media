import { useEffect, useState } from 'react';
import { useModals } from '@mantine/modals';

import { getAuthCredentialsFromLocalStorage } from 'lib';

function useAuth(): Boolean {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    let checkAuth = false;

    if (typeof window === 'object' && !window.__WAS_SSR) {
      console.log(window.__WAS_SSR);
      const authCredentials = getAuthCredentialsFromLocalStorage();

      if (authCredentials && authCredentials.token) {
        checkAuth = true;
      }

      return checkAuth;
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      const authCredentials = getAuthCredentialsFromLocalStorage();

      console.log({ authCredentials });

      if (authCredentials && authCredentials.token) {
        setAuthenticated(true);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     modals.openContextModal('LOGIN', {
  //       innerProps: {},
  //     });
  //   }
  // }, [isAuthorized]);

  return isAuthenticated;
}

export { useAuth };
