import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import {
  PostLayout,
  PostContent,
  PostCommunity,
  JoinCommunity,
  MemberCount,
  CommentEditor,
  PostComments,
} from 'components';
import {
  fetchCommunity,
  addApolloState,
  initializeApollo,
  fetchPost,
} from 'lib';
import { Community, PostParams } from 'types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!('id' in params)) {
    return { notFound: true };
  }

  try {
    const apolloClient = initializeApollo({ ctx: context });
    const { name, id } = params as PostParams;

    const community = await fetchCommunity(name, apolloClient);
    const post = await fetchPost(id, apolloClient);

    if (!community || !post) {
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
    console.log({ error });
    return {
      notFound: true,
    };
  }
};

export default function ({
  community,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { banner, picture, title, description, members, createdAt, id } =
    community as Community;
  return (
    <PostLayout
      main={<PostContent />}
      comments={<PostComments postId={id} />}
      right={
        <PostCommunity
          joinElement={
            <JoinCommunity data={{ communityId: id, title }} fullWidth={true} />
          }
          countElement={<MemberCount title={title} />}
          data={{
            banner,
            picture,
            title,
            description,
            createdAt,
          }}
        />
      }
    />
  );
}
