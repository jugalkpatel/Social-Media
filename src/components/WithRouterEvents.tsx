import { useEffect } from 'react';

import { useRouter } from 'next/router';
import NProgress from 'nprogress';

type Props = {
  children: React.ReactNode;
};

function WithRouterEvents({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeError', handleStop);
    router.events.on('routeChangeComplete', handleStop);

    return () => {
      router.events.off('hashChangeStart', handleStart);
      router.events.off('hashChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return <>{children}</>;
}

export default WithRouterEvents;
