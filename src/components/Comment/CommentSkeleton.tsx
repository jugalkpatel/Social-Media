import { CommentLayout } from 'components';
import { Skeleton } from '@mantine/core';

function CommentSkeleton() {
  return (
    <CommentLayout
      avatar={<Skeleton height={35} circle={true} />}
      info={<Skeleton height={15} width="30%" radius={0} />}
      main={<Skeleton height={100} width="100%" radius={0} />}
      votes={<Skeleton height={15} width="15%" radius={0} />}
    />
  );
}

export default CommentSkeleton;
