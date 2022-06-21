import * as Types from './graphql-generated/types';

export interface PageProps {
  props?: Record<string, any>;
}

export type AuthMode = 'LOGIN' | 'REGISTER';

export type State = 'DATA' | 'LOADING' | 'ERROR';

export type IPostState = {
  community: string;
  title: string;
  content: string;
};

export type AuthCredentials = {
  token: string;
  id: string;
  name: string;
};

export type PostParams = {
  name: string;
  id: string;
};

export type ICommunityMember = {
  id: string;
};

export type CommunityPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  postedBy: {
    id: string;
    name: string;
  };
};

export type GetComunityResult = {
  id: string;
  title: string;
  picture: string;
  banner: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  members: Array<ICommunityMember>;
  posts: Array<CommunityPost>;
};

export type CommunityError = {
  message: string;
};

export type AllCommunitiesResponse = AllCommunities | CommunityError;

export type CommunityVar = Array<Community> | [];

export type Community = {
  __typename?: 'FetchCommunityResult';
  id: string;
  title: string;
  createdAt: any;
  banner: string;
  description: string;
  updatedAt: any;
  picture: string;
  creator: { __typename?: 'CommunityUser'; id: string };
  members: Array<{ __typename?: 'CommunityUser'; id: string } | null>;
};

// added custom post type because we're only fetching half data.
export type Post = {
  __typename?: 'Post';
  id: string;
  title: string;
  content: string;
  createdAt: any;
  community?: {
    __typename?: 'Community';
    id: string;
    title: string;
    picture: string;
  } | null;
  postedBy?: {
    __typename?: 'User';
    id: string;
    name: string;
    picture: string;
  } | null;
  bookmarkedBy?: Array<{
    __typename?: 'User';
    id: string;
  } | null> | null;
  votes: Array<{
    __typename?: 'Vote';
    id: string;
    type: Types.VoteType;
    votedBy?: { __typename?: 'User'; id: string } | null;
  } | null>;
  comments?: Array<{
    __typename?: 'Comment';
    id: string;
    text: string;
    createdAt: any;
    user?: {
      __typename?: 'User';
      id: string;
      name: string;
      picture: string;
    } | null;
    votes?: Array<{
      __typename?: 'CommentVote';
      id: string;
      type: Types.VoteType;
      votedBy?: { __typename?: 'User'; id: string } | null;
    } | null> | null;
  } | null> | null;
};

export type Vote = {
  id: string;
  type: Types.VoteType;
  votedBy?: { __typename?: 'User'; id: string } | null;
};

export type Comment = {
  __typename?: 'Comment';
  id: string;
  text: string;
  createdAt: any;
  user?: {
    __typename?: 'User';
    id: string;
    name: string;
    picture: string;
  } | null;
  votes?: Array<{
    __typename?: 'CommentVote';
    id: string;
    type: Types.VoteType;
    votedBy?: { __typename?: 'User'; id: string } | null;
  } | null> | null;
};
