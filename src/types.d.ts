import type { PrismaClient } from '@prisma/client';
import type { NextApiResponse, NextApiRequest } from 'next';

export type AuthMode = 'LOGIN' | 'REGISTER';

export type AuthCredentials = {
  token: string;
  id: string;
  name: string;
};

export type Community = {
  id: string;
  title: string;
};

export type AllCommunities = {
  allCommunities: {
    communities: Array<Community>;
  };
};

export type CommunityError = {
  message: string;
};

export type AllCommunitiesResponse = AllCommunities | CommunityError;

export type CommunityVar = Array<Community> | [];

export type Context = {
  prisma: PrismaClient;
  request: NextApiRequest;
  response: NextApiResponse;
  userId?: string;
};
