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
  user: AuthUser;
};

export type AuthResponse = AuthError | AuthPayload;

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post: Post;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommonError = {
  message: Scalars['String'];
};

export type Community = {
  __typename?: 'Community';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  description: Scalars['String'];
  id: Scalars['String'];
  members?: Maybe<Array<User>>;
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
  postedBy: CommunityUser;
  title: Scalars['String'];
};

export type CommunityResponse = CommunityError | CommunityResult;

export type CommunityResult = {
  __typename?: 'CommunityResult';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type CommunityUser = {
  __typename?: 'CommunityUser';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type CreatePostResponse = CreatePostResult | PostError;

export type CreatePostResult = {
  __typename?: 'CreatePostResult';
  community: Scalars['String'];
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
  posts?: Maybe<Array<Maybe<CommunityPost>>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GetPostResponse = IPostType | PostError;

export type GetUserCommunitiesResponse = IUserCommunites | UserError;

export type ICommonVote = {
  __typename?: 'ICommonVote';
  id: Scalars['String'];
  type: VoteType;
  votedBy: IUserWithId;
};

export type IJoinCommunityMember = {
  __typename?: 'IJoinCommunityMember';
  id: Scalars['String'];
};

export type IPost = {
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type IPostComment = {
  __typename?: 'IPostComment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: IPostUser;
  votes?: Maybe<Array<ICommonVote>>;
};

export type IPostCommunity = {
  __typename?: 'IPostCommunity';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  members?: Maybe<Array<IUserWithId>>;
  picture: Scalars['String'];
  title: Scalars['String'];
};

export type IPostType = IPost & {
  __typename?: 'IPostType';
  bookmarkedBy?: Maybe<Array<Maybe<IUserWithId>>>;
  comments?: Maybe<Array<Maybe<IPostComment>>>;
  community: IPostCommunity;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postedBy: IPostUser;
  title: Scalars['String'];
  votes?: Maybe<Array<ICommonVote>>;
};

export type IPostUser = {
  __typename?: 'IPostUser';
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type IRefresh = {
  __typename?: 'IRefresh';
  success: Scalars['Boolean'];
};

export type IUser = {
  __typename?: 'IUser';
  id: Scalars['String'];
};

export type IUserCommunites = {
  __typename?: 'IUserCommunites';
  communities?: Maybe<Array<Maybe<IUserCommunity>>>;
  id: Scalars['String'];
};

export type IUserCommunity = {
  __typename?: 'IUserCommunity';
  id: Scalars['String'];
  picture: Scalars['String'];
  title: Scalars['String'];
};

export type IUserQueryResult = {
  __typename?: 'IUserQueryResult';
  id: Scalars['String'];
  joinedCommunities: Array<Maybe<IUser>>;
  name: Scalars['String'];
};

export type IUserWithId = {
  __typename?: 'IUserWithID';
  id: Scalars['String'];
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
  createPost: CreatePostResponse;
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


export type MutationCreatePostArgs = {
  community: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
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

export type Password = {
  __typename?: 'Password';
  id: Scalars['String'];
  password: Scalars['String'];
  user: User;
};

export type Post = IPost & {
  __typename?: 'Post';
  comments?: Maybe<Array<Maybe<Comment>>>;
  community: Community;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postedBy: User;
  title: Scalars['String'];
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type PostError = CommonError & {
  __typename?: 'PostError';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  GetCommunity: GetCommunityResponse;
  allCommunities: AllCommunitiesResponse;
  authenticate: AuthResponse;
  getPost: GetPostResponse;
  getUserCommunities: GetUserCommunitiesResponse;
  user: IUserQueryResult;
};


export type QueryGetCommunityArgs = {
  name: Scalars['String'];
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export type RefreshResponse = AuthError | IRefresh;

export type User = {
  __typename?: 'User';
  commentedOn?: Maybe<Array<Maybe<Comment>>>;
  communitiesCreated?: Maybe<Array<Maybe<Community>>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  joinedCommunities?: Maybe<Array<Maybe<Community>>>;
  name: Scalars['String'];
  password: Password;
  picture: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  tokenVersion: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type UserError = CommonError & {
  __typename?: 'UserError';
  message: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
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
