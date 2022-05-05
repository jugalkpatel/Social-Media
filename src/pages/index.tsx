import type { NextPage } from 'next';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { authorizationVar } from 'lib';

//end point for the routes on next js: /api/graphql

const IS_LOGGED_IN = gql`
  query getIsLoggedIn {
    isLoggedIn @client
    id @client
    name @client
    token @client
  }
`;

const IndexPage: NextPage = () => {
  // const { data, loading, error } = useQuery(IS_LOGGED_IN);
  const isAuthenticated = useReactiveVar(authorizationVar);

  console.log({ isAuthenticated });

  // console.log({ data });

  // if (loading) {
  //   return <h1>Loading....</h1>;
  // }

  // if (data) {
  //   return <pre>{JSON.stringify(data, null, 2)}</pre>;
  // }

  return <h1>Something went wrong</h1>;
};

export default IndexPage;
