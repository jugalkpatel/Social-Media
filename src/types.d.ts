export type AuthMode = 'LOGIN' | 'REGISTER';

export type AuthCredentials = {
  token: string;
  id: string;
  name: string;
};

// export type Community = {
//   id: string;
//   title: string;
// };

// export type AllCommunities = {
//   allCommunities: {
//     communities: Array<Community>;
//   };
// };

export type ICommunityCreator = {
  id: string;
  name: string;
};

export type ICommunityMember = {
  id: string;
  name: string;
};

export type Community = {
  id: string;
  title: string;
  description: string;
  creator: ICommunityCreator;
  members: Array<ICommunityMember>;
  createdAt: string;
};

export type CommunityError = {
  message: string;
};

export type AllCommunitiesResponse = AllCommunities | CommunityError;

export type CommunityVar = Array<Community> | [];
