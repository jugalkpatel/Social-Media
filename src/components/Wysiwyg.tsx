import dynamic from 'next/dynamic';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// export default dynamic(() => import('react-quill'), { ssr: false });
export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
});
