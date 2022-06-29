import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import Router from 'next/router';

import { userIdVar } from 'lib';

type Props = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: Props) {
  const isAuthenticated = !!useReactiveVar(userIdVar);

  useEffect(() => {
    if (isAuthenticated) {
      //   Router.back('');

      Router.push(`/`);

      return;
    }

    Router.push('/popular');
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthWrapper;
