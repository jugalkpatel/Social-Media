import * as Types from './graphql/types';

export interface PageProps {
  props?: Record<string, any>;
}

export type AuthMode = 'LOGIN' | 'REGISTER';

export type State = 'DATA' | 'LOADING' | 'ERROR';

export type AuthCredentials = {
  token: string;
  id: string;
  name: string;
};

export type ICommunityMember = {
  id: string;
};

export type Community = {
  id: string;
  title: string;
  picture: string;
  banner: string;
  description: string;
  members: Array<ICommunityMember>;
  createdAt: string;
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

export type Post = {
  __typename?: 'IPostType';
  id: string;
  title: string;
  content: string;
  createdAt: any;
  bookmarkedBy?: Array<{
    __typename?: 'IUserWithID';
    id: string;
  } | null> | null;
  postedBy: {
    __typename?: 'IPostUser';
    id: string;
    name: string;
    picture: string;
  };
  community: {
    __typename?: 'IPostCommunity';
    id: string;
    title: string;
    description: string;
    banner: string;
    picture: string;
    createdAt: any;
    members?: Array<{ __typename?: 'IUserWithID'; id: string }> | null;
  };
  votes?: Array<{
    __typename?: 'ICommonVote';
    id: string;
    type: Types.VoteType;
    votedBy: { __typename?: 'IUserWithID'; id: string };
  }> | null;
  comments?: Array<{
    __typename?: 'IPostComment';
    id: string;
    text: string;
    createdAt: any;
    updatedAt: any;
    user: {
      __typename?: 'IPostUser';
      id: string;
      name: string;
      picture: string;
    };
    votes?: Array<{
      __typename?: 'ICommonVote';
      id: string;
      type: Types.VoteType;
      votedBy: { __typename?: 'IUserWithID'; id: string };
    }> | null;
  } | null> | null;
};
