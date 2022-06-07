import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { ContainerLayout } from 'components';

const IS_LOGGED_IN = gql`
  query getIsLoggedIn {
    isLoggedIn @client
    id @client
    name @client
  }
`;

const IndexPage: NextPage = () => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  // console.log({ data });

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (data) {
    return (
      <ContainerLayout>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <h1>Something went wrong</h1>
    </ContainerLayout>
  );

  return;
};

export default IndexPage;
