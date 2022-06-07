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
