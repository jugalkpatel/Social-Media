import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, createStyles } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

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

const useStyles = createStyles((theme) => ({
  button: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
}));

export default function ({
  community,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { id, title, description, banner, picture, createdAt } =
    community as Community;

  const { classes } = useStyles();
  const [, scrollTo] = useWindowScroll();
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
        input={<PostInput communityId={id} />}
        addPost={<AddPost communityId={id} />}
        count={<MemberCount title={title} />}
        allPosts={<CommunityPosts title={title} />}
      />

      <Button
        className={classes.button}
        size="xs"
        px="sm"
        onClick={() => scrollTo({ y: 0 })}
      >
        Back to Top
      </Button>
    </>
  );
}
