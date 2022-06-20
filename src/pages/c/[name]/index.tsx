import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import {
  CommunityHeader,
  CommunityContent,
  JoinCommunity,
  MemberCount,
  AddPost,
  PostInput,
  CommunityPosts,
} from 'components';
import { initializeApollo, fetchCommunity, addApolloState } from 'lib';
import { Community } from 'graphql-generated';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({ ctx: context });

  try {
    const {
      params: { name },
    } = context;

    const communityName = Array.isArray(name) ? name[0] : name;

    const community = await fetchCommunity(communityName, apolloClient);

    console.log({ community });

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

type Parms = {
  name: string;
};

export default function ({
  community,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { id, title, description, banner, picture, createdAt } =
    community as Community;

  return (
    <>
      <CommunityHeader
        data={{
          banner,
          description,
          picture,
          title,
        }}
        count={<MemberCount title={title} />}
        join={
          <JoinCommunity
            data={{
              communityId: id,
              title,
            }}
          />
        }
      />
      <CommunityContent
        data={{
          description,
          date: createdAt,
        }}
        input={<PostInput title={title} />}
        addPost={<AddPost title={title} />}
        count={<MemberCount title={title} />}
        allPosts={<CommunityPosts title={title} />}
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
