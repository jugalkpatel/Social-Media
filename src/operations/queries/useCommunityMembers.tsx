import { ApolloError, gql, useQuery } from '@apollo/client';

export type FetchMembersQuery = {
  fetchCommunity:
    | { __typename?: 'CommunityError'; message: string }
    | {
        __typename: 'FetchCommunityResult';
        members: Array<{ id: string } | null>;
      };
};

export type FetchMembersVars = {
  name: string;
};

export const FETCH_MEMBERS = gql`
  query FetchCommunity($name: String!) {
    fetchCommunity(name: $name) {
      ... on FetchCommunityResult {
        id
        members {
          id
        }
        ... on CommunityError {
          message
        }
      }
    }
  }
`;

type Props = {
  title: string;
};

function setState(data: FetchMembersQuery, error: ApolloError) {
  if (data.fetchCommunity.__typename === 'FetchCommunityResult') {
    return { members: data.fetchCommunity.members, state: 'DATA' };
  }

  if (data.fetchCommunity.__typename === 'CommunityError' || error) {
    return { members: [], state: 'ERROR' };
  }

  return { members: [], state: 'LOADING' };
}

function useCommunityMembers({ title }: Props) {
  const { data, error } = useQuery<FetchMembersQuery, FetchMembersVars>(
    FETCH_MEMBERS,
    { variables: { name: title }, fetchPolicy: 'cache-first' },
  );

  const { members, state } = setState(data, error);

  return { members, state };
}

export default useCommunityMembers;
