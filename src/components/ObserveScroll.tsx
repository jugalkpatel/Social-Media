import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

function ObserveScroll({
  fetchMorePosts,
}: {
  fetchMorePosts: () => Promise<void>;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      (async () => {
        await fetchMorePosts();
      })();
    }
  }, [inView]);

  return <span ref={ref}></span>;
}

export default ObserveScroll;
