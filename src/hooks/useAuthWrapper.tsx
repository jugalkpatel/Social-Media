import { useReactiveVar } from '@apollo/client';
import { userIdVar } from 'lib';
import { useEffect } from 'react';
import Router from 'next/router';

function useAuthWrapper() {
  const isAuthenticated = !!useReactiveVar(userIdVar);

  useEffect(() => {
    if (isAuthenticated) {
      Router.back();

      return;
    }

    Router.push('/popular');
  }, [isAuthenticated]);
}

export default useAuthWrapper;
