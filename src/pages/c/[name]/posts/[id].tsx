import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Community, PostParams } from 'types';
import {
  PostPageLayout,
  PostContent,
  PostCommunity,
  JoinCommunity,
  MemberCount,
  PostComments,
} from 'components';
import {
  fetchCommunity,
  addApolloState,
  initializeApollo,
  fetchPost,
} from 'lib';
import { IPostType } from 'graphql-generated';

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
      props: { community, post },
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
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { banner, picture, title, description, createdAt, id, members } =
    community as Community;
  const { id: postId, comments } = post as IPostType;
  return (
    <PostPageLayout
      main={<PostContent />}
      comments={<PostComments postId={postId} commentCount={comments.length} />}
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
