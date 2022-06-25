import { Skeleton } from '@mantine/core';
import dynamic from 'next/dynamic';

export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
  // loading: () => <Skeleton width="100%" height={100} />,
});
