import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { ApolloError, useReactiveVar } from '@apollo/client';
import { IoMdClose } from 'react-icons/io';

import { GetComunityResult, State } from 'types';
import { CommunityHeader, CommunityContent, JoinCommunity } from 'components';
import {
  initializeApollo,
  fetchCommunity,
  userIdVar,
  addApolloState,
  // handleAuth,
} from 'lib';
import {
  useGetCommunityQuery,
  GetCommunityQuery,
} from '../../../graphql/fetchCommity/__generated__/fetchCommity.generated';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({ ctx: context });

  // let isAuthenticated = false;

  try {
    const {
      params: { name },
      // req,
    } = context;
    // const user = await handleAuth(req, apolloClient);

    // if (!('authenticated' in user)) {
    //   isAuthenticated = true;
    // }

    // console.log({ user });

    const community = await fetchCommunity(name, apolloClient);

    if (!community) {
      return {
        notFound: true,
      };
    }

    const documentProps = addApolloState(apolloClient, {
      props: { community },
    });

    return {
      props: documentProps.props,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const getState = (data: GetCommunityQuery, error: ApolloError) => {
  if (
    data &&
    data.GetCommunity &&
    data.GetCommunity.__typename === 'GetCommunityResult'
  ) {
    const community = data.GetCommunity;

    return { community, state: 'DATA' };
  }

  if (
    (data &&
      data.GetCommunity &&
      data.GetCommunity.__typename === 'CommunityError') ||
    error
  ) {
    return { community: null, state: 'ERROR' };
  }

  return { community: null, state: 'LOADING' };
};

export default function ({
  community,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { title } = community as GetComunityResult;
  const { data, error } = useGetCommunityQuery({
    variables: { name: title },
    fetchPolicy: 'cache-only',
  });

  const { community: communityData, state } = getState(data, error);
  const userId = useReactiveVar(userIdVar);

  if (!communityData) {
    return null;
  }

  const {
    id,
    title: name,
    description,
    banner,
    picture,
    createdAt,
    members,
    posts,
  } = communityData;

  const isUserInCommunity = communityData.members.find(
    ({ id }) => id === userId,
  );

  const onCreatePost = () => {
    if (isUserInCommunity) {
      router.push('/submit');
      return;
    }

    showNotification({
      message: 'You must join community to create a post.',
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });
  };

  return (
    <>
      <CommunityHeader
        data={{
          banner,
          description,
          picture,
          title: name,
          memberCount: members.length,
          state: state as State,
        }}
      >
        <JoinCommunity
          data={{
            isAuthenticated: !!userId,
            isUserInCommunity: !!isUserInCommunity,
            communityId: id,
            title: name,
            state: state as State,
          }}
        />
      </CommunityHeader>
      <CommunityContent
        data={{
          description,
          date: createdAt,
          posts,
          memberCount: members.length,
          onCreatePost,
          isAuthenticated: !!userId,
          state: state as State,
          isUserInCommunity: !!isUserInCommunity,
        }}
      />
    </>
  );
}

// let isAuthenticated = false;

// const user = await handleAuth(req, apolloClient);

// if (!('authenticated' in user)) {
//   isAuthenticated = true;
// }

// console.log({ user });
