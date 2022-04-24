import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useModals } from '@mantine/modals';

import { authorizationVar } from 'lib';

function useAuth(): Boolean {
  const isAuthorized = useReactiveVar(authorizationVar);
  const modals = useModals();

  useEffect(() => {
    if (!isAuthorized) {
      modals.openContextModal('LOGIN', {
        innerProps: {},
      });
    }
  }, [isAuthorized]);

  return isAuthorized;
}

export { useAuth };
