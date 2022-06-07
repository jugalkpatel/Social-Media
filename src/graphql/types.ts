export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AllCommunities = {
  __typename?: 'AllCommunities';
  communities: Array<CommunityResult>;
};

export type AllCommunitiesResponse = AllCommunities | CommunityError;

export type AuthError = CommonError & {
  __typename?: 'AuthError';
  message: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: User;
};

export type AuthResponse = AuthError | AuthPayload;

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post?: Maybe<Post>;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type CommonError = {
  message: Scalars['String'];
};

export type Community = {
  __typename?: 'Community';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: CommunityCreator;
  description: Scalars['String'];
  id: Scalars['String'];
  picture: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CommunityCreator = {
  __typename?: 'CommunityCreator';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CommunityError = CommonError & {
  __typename?: 'CommunityError';
  message: Scalars['String'];
};

export type CommunityPost = {
  __typename?: 'CommunityPost';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postedBy: User;
  title: Scalars['String'];
};

export type CommunityResponse = CommunityError | CommunityResult;

export type CommunityResult = {
  __typename?: 'CommunityResult';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type GetCommunityMember = {
  __typename?: 'GetCommunityMember';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GetCommunityResponse = CommunityError | GetCommunityResult;

export type GetCommunityResult = {
  __typename?: 'GetCommunityResult';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: CommunityCreator;
  description: Scalars['String'];
  id: Scalars['String'];
  members: Array<Maybe<GetCommunityMember>>;
  picture: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IJoinCommunityMember = {
  __typename?: 'IJoinCommunityMember';
  id: Scalars['String'];
};

export type IRefresh = {
  __typename?: 'IRefresh';
  success: Scalars['Boolean'];
};

export type IUser = {
  __typename?: 'IUser';
  id: Scalars['String'];
};

export type IUserQueryResult = {
  __typename?: 'IUserQueryResult';
  id: Scalars['String'];
  joinedCommunities: Array<Maybe<IUser>>;
  name: Scalars['String'];
};

export type JoinCommunityResponse = CommunityError | IJoinCommunityMember;

export type JoinCommunityResult = {
  __typename?: 'JoinCommunityResult';
  members: Array<Maybe<IJoinCommunityMember>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCommunity: CommunityResponse;
  JoinCommunity: JoinCommunityResponse;
  authenticate: AuthResponse;
  leaveCommunity: JoinCommunityResponse;
  login: AuthResponse;
  refresh: RefreshResponse;
  register: AuthResponse;
};


export type MutationCreateCommunityArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationLeaveCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postedBy: User;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  GetCommunity: GetCommunityResponse;
  allCommunities: AllCommunitiesResponse;
  authenticate: AuthResponse;
  user: IUserQueryResult;
};


export type QueryGetCommunityArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export type RefreshResponse = AuthError | IRefresh;

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  count: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post: Post;
  type: VoteType;
  updatedAt: Scalars['DateTime'];
  votedBy: User;
};

export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}
