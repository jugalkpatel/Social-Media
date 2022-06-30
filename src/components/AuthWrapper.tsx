import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import Router from 'next/router';
import { useRouter } from 'next/router';

import { userIdVar } from 'lib';

type Props = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: Props) {
  const isAuthenticated = !!useReactiveVar(userIdVar);
  const { asPath } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const path = asPath !== '/' ? asPath : '/';
      Router.push(path);

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
