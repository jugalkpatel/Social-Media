import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import {
  PostLayout,
  PostContent,
  PostCommunity,
  ReadOnlyEditor,
} from 'components';
import { addApolloState, fetchPost, initializeApollo } from 'lib';
import { Post } from 'types';

type Params = {
  name: string;
  id: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!('id' in params)) {
    return { notFound: true };
  }

  const apolloClient = initializeApollo({ ctx: context });

  try {
    const { id } = params as Params;

    const post = await fetchPost(id, apolloClient);

    console.log({ post });

    if (!post) {
      return {
        notFound: true,
      };
    }

    const documentProps = addApolloState(apolloClient, {
      props: { post },
    });

    console.log({ documentProps });

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

const voteCount = () => {};

// build a layout for desktop and mobile
export default function ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log({ post });
  const {
    community: {
      banner,
      picture,
      title: communityTitle,
      description,
      members,
      createdAt,
    },
    votes,
    content,
    createdAt: postTime,
    postedBy: { name: userName },
    title,
  } = post as Post;
  return (
    <PostLayout
      main={
        <PostContent
          data={{
            picture,
            communityTitle,
            postTime,
            createdBy: userName,
            postTitle: title,
          }}
        >
          <ReadOnlyEditor content={content} />
        </PostContent>
      }
      right={
        <PostCommunity
          data={{
            banner,
            picture,
            title: communityTitle,
            description,
            memberCount: members.length,
            createdAt,
          }}
        />
      }
    />
  );
}
