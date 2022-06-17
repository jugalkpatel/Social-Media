import * as Types from './graphql-generated/types';

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
  __typename?: 'IPostType';
  id: string;
  title: string;
  content: string;
  createdAt: any;
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
    picture: string;
  };
  votes?: Array<{
    __typename?: 'ICommonVote';
    id: string;
    type: Types.VoteType;
    votedBy: { __typename?: 'IUserWithID'; id: string };
  }> | null;
  bookmarkedBy?: Array<{
    __typename?: 'IUserWithID';
    id: string;
  } | null> | null;
  comments?: Array<{
    __typename?: 'Comment';
    id: string;
    createdAt: any;
    updatedAt: any;
    text: string;
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
    } | null> | null;
  } | null> | null;
};

export type PartialCommunity = {
  __typename?: 'FetchCommunityResult';
  id: string;
  title: string;
  createdAt: any;
  banner: string;
  description: string;
  picture: string;
  members: Array<{ __typename?: 'CommunityUser'; id: string } | null>;
};

// export type Vote = {
//   __typename?: 'ICommonVote';
//   id: string;
//   type: Types.VoteType;
//   votedBy: { __typename?: 'IUserWithID'; id: string };
// };
