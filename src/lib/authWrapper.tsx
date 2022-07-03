import { ComponentType } from 'react';
// import { useRouter } from 'next/router';
import Router from 'next/router';
import { userIdVar } from 'lib';
import { useReactiveVar } from '@apollo/client';

function withAuth<T>(Component: ComponentType<T>) {
  return (props: T) => {
    const userId = useReactiveVar(userIdVar);
    // const router = useRouter();

    console.log({ userId });

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
