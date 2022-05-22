import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { initializeApollo, handleAuth, fetchCommunity } from 'lib';

// const context = setContext((request) => {
// })

// what he is doing in the video ?

// first extracting tokens from request itself
// then setting those tokens in the header again
// then again requesting tokens from the same api

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({ ctx: context });

  let isAuthenticated = false;

  try {
    const {
      params: { name },
      req,
      res,
    } = context;

    const user = await handleAuth(req, apolloClient);

    if (!('authenticated' in user)) {
      isAuthenticated = true;
    }

    const community = await fetchCommunity(name, apolloClient);

    console.log({ community });

    if (!community) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        community,
        isAuthenticated,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ({
  community,
  isAuthenticated,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log({ community });
  console.log({ isAuthenticated });
  return <h1>hello,i'm community page</h1>;
}
