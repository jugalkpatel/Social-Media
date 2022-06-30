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

export type AllCommunitiesResponse = AllCommunities | CommonError;

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: AuthUser;
};

export type AuthResponse = AuthPayload | CommonError;

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type BatchPosts = {
  __typename?: 'BatchPosts';
  cursorId: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type BatchPostsResponse = BatchPosts | CommonError;

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post?: Maybe<Post>;
  text: Scalars['String'];
  user?: Maybe<User>;
  votes?: Maybe<Array<Maybe<CommentVote>>>;
};

export type CommentResponse = Comment | CommonError;

export type CommentVote = {
  __typename?: 'CommentVote';
  comment?: Maybe<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  type: VoteType;
  votedBy?: Maybe<User>;
};

export type CommentVoteResponse = CommentVote | CommonError;

export type CommonError = {
  __typename?: 'CommonError';
  message: Scalars['String'];
};

export type Community = {
  __typename?: 'Community';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  description: Scalars['String'];
  id: Scalars['String'];
  members: Array<Maybe<User>>;
  picture: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  title: Scalars['String'];
};

export type CommunityPost = {
  __typename?: 'CommunityPost';
  id: Scalars['String'];
};

export type CommunityResponse = CommonError | Community;

export type CommunityResult = {
  __typename?: 'CommunityResult';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type CommunityUser = {
  __typename?: 'CommunityUser';
  id: Scalars['String'];
};

export type CreateCommentResponse = CommonError | IComment;

export type FetchCommunityResponse = CommonError | FetchCommunityResult;

export type FetchCommunityResult = ICommunity & {
  __typename?: 'FetchCommunityResult';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: CommunityUser;
  description: Scalars['String'];
  id: Scalars['String'];
  members: Array<Maybe<CommunityUser>>;
  picture: Scalars['String'];
  posts?: Maybe<Array<Maybe<IPostType>>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FetchPostCommentsResponse = CommonError | FetchPostCommentsResult;

export type FetchPostCommentsResult = {
  __typename?: 'FetchPostCommentsResult';
  comments?: Maybe<Array<Maybe<IComment>>>;
  postId: Scalars['String'];
};

export type FetchPostResponse = CommonError | IPostType;

export enum FilterType {
  New = 'NEW',
  Top = 'TOP'
}

export type GetUserCommunitiesResponse = CommonError | IUserCommunites;

export type IComment = {
  __typename?: 'IComment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post: PostWithId;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: IPostUser;
  votes?: Maybe<Array<Maybe<ICommonVote>>>;
};

export type ICommonVote = {
  __typename?: 'ICommonVote';
  id: Scalars['String'];
  type: VoteType;
  votedBy: IUserWithId;
};

export type ICommunity = {
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  picture: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ICommunityResponse = CommonError | CommunityResult;

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

export type IPostCommunity = ICommunity & {
  __typename?: 'IPostCommunity';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  picture: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IPostType = IPost & {
  __typename?: 'IPostType';
  bookmarkedBy?: Maybe<Array<Maybe<IUserWithId>>>;
  comments?: Maybe<Array<Maybe<IComment>>>;
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

export type JoinCommunityResponse = CommonError | IJoinCommunityMember;

export type JoinCommunityResult = {
  __typename?: 'JoinCommunityResult';
  members: Array<Maybe<IJoinCommunityMember>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: UserResponse;
  createBookmark: PostResponse;
  createComment: CommentResponse;
  createCommunity: CommunityResponse;
  createPost: PostResponse;
  createUser: UserResponse;
  joinCommunity: CommunityResponse;
  leaveCommunity: CommunityResponse;
  login: UserResponse;
  refresh: RefreshResponse;
  register: UserResponse;
  removeBookmark: PostResponse;
  removeCommentVote: CommentVoteResponse;
  removeVote: VoteResponse;
  vote: VoteResponse;
  voteComment: CommentVoteResponse;
};


export type MutationCreateBookmarkArgs = {
  postId: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreateCommunityArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreatePostArgs = {
  community: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
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


export type MutationRemoveBookmarkArgs = {
  postId: Scalars['String'];
};


export type MutationRemoveCommentVoteArgs = {
  commentId: Scalars['String'];
  voteId: Scalars['String'];
};


export type MutationRemoveVoteArgs = {
  communityId: Scalars['String'];
  postId: Scalars['String'];
  voteId: Scalars['String'];
};


export type MutationVoteArgs = {
  data?: InputMaybe<VoteArgs>;
};


export type MutationVoteCommentArgs = {
  commentId: Scalars['String'];
  type: VoteType;
};

export type Password = {
  __typename?: 'Password';
  id: Scalars['String'];
  password: Scalars['String'];
  user?: Maybe<User>;
};

export type Post = {
  __typename?: 'Post';
  bookmarkedBy?: Maybe<Array<Maybe<User>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  community?: Maybe<Community>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postedBy?: Maybe<User>;
  title: Scalars['String'];
  votes: Array<Maybe<Vote>>;
};

export type PostResponse = CommonError | Post;

export type PostWithId = {
  __typename?: 'PostWithId';
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authenticate: AuthResponse;
  fetchAllPostsByTime: BatchPostsResponse;
  fetchAllPostsByVotes: BatchPostsResponse;
  fetchAllUserPostsByTime: BatchPostsResponse;
  fetchAllUserPostsByVote: BatchPostsResponse;
  fetchCommunity: CommunityResponse;
  fetchPost: PostResponse;
  fetchUser: UserResponse;
  fetchUserBookmarks: BatchPostsResponse;
};


export type QueryFetchAllPostsByTimeArgs = {
  cursorId?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFetchAllPostsByVotesArgs = {
  cursorId?: InputMaybe<Scalars['String']>;
  take: Scalars['Int'];
};


export type QueryFetchAllUserPostsByTimeArgs = {
  cursorId?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFetchAllUserPostsByVoteArgs = {
  cursorId?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};


export type QueryFetchCommunityArgs = {
  name: Scalars['String'];
};


export type QueryFetchPostArgs = {
  postId: Scalars['String'];
};


export type QueryFetchUserBookmarksArgs = {
  cursorId?: InputMaybe<Scalars['String']>;
  take: Scalars['Int'];
};

export type RefreshResponse = CommonError | IRefresh;

export type User = {
  __typename?: 'User';
  bookmarks?: Maybe<Array<Maybe<Post>>>;
  commentVotes: Array<Maybe<CommentVote>>;
  commentedOn?: Maybe<Array<Maybe<Comment>>>;
  communitiesCreated?: Maybe<Array<Community>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  joinedCommunities?: Maybe<Array<Community>>;
  name: Scalars['String'];
  password?: Maybe<Password>;
  picture: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  tokenVersion: Scalars['Int'];
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type UserResponse = CommonError | User;

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post?: Maybe<Post>;
  type: VoteType;
  voteUser?: Maybe<User>;
};

export type VoteArgs = {
  communityId: Scalars['String'];
  postId: Scalars['String'];
  type: VoteType;
};

export type VoteResponse = CommonError | Vote;

export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}
