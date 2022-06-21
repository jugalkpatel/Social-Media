import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { PostParams } from 'types';
import { Community } from 'graphql-generated';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!('id' in params)) {
    return { notFound: true };
  }

  try {
    const apolloClient = initializeApollo({ ctx: context });
    const { name, id } = params as PostParams;

    const community = await fetchCommunity(name, apolloClient);
    // const post = await fetchPost(id, apolloClient);

    if (!community) {
      return {
        notFound: true,
      };
    }

    const documentProps = addApolloState(apolloClient, {
      props: { community, postId: id },
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
  postId,
}: // post,
InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { banner, picture, title, description, createdAt, id } =
    community as Community;

  console.log({ community });
  // const { id: postId, comments } = post as IPostType;
  return (
    <PostPageLayout
      main={<PostContent postId={postId} />}
      // comments={<PostComments postId={postId} commentCount={comments.length} />}
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
