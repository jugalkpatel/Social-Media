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
  token: Scalars['String'];
  user: User;
};

export type AuthResponse = AuthError | AuthPayload;

export type CommonError = {
  message: Scalars['String'];
};

export type Community = {
  __typename?: 'Community';
  createdAt: Scalars['DateTime'];
  creator: User;
  description: Scalars['String'];
  id: Scalars['String'];
  members?: Maybe<Array<Maybe<User>>>;
  title: Scalars['String'];
};

export type CommunityError = CommonError & {
  __typename?: 'CommunityError';
  message: Scalars['String'];
};

export type CommunityResponse = CommunityError | CommunityResult;

export type CommunityResult = {
  __typename?: 'CommunityResult';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCommunity: CommunityResponse;
  login: AuthResponse;
  register: AuthResponse;
};


export type MutationCreateCommunityArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  allCommunities: AllCommunitiesResponse;
  user: User;
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};
