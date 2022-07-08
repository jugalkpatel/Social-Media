import { ComponentType } from 'react';
import Router from 'next/router';
import { useReactiveVar } from '@apollo/client';

import { userIdVar } from 'lib';

function withAuth<T>(Component: ComponentType<T>) {
  return (props: T) => {
    const userId = useReactiveVar(userIdVar);

    if (typeof window !== 'undefined') {
      if (!userId) {
        Router.push('/popular');
        return null;
      }

      return <Component {...props} />;
    }

    return null;
  };
}

export default withAuth;
