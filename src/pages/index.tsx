import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { Tabs } from '@mantine/core';
import { AuthWrapper, UserFeed } from 'components';
import { useState } from 'react';

const IS_LOGGED_IN = gql`
  query getIsLoggedIn {
    isLoggedIn @client
    id @client
    name @client
  }
`;

const IndexPage: NextPage = () => {
  return (
    <AuthWrapper>
      <UserFeed />;
    </AuthWrapper>
  );
};

export default IndexPage;
