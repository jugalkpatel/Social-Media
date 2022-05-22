import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Community, CommunityError } from 'types';

const GET_COMMUNITY = gql`
  query GetCommunityResponse($name: String!) {
    GetCommunityResponse(name: $name) {
      ... on Community {
        id
        title
        description
        creator {
          id
          name
        }
        members {
          id
          name
        }
        createdAt
      }
      ... on CommunityError {
        message
      }
    }
  }
`;

export async function fetchCommunity(
  name: string | string[],
  apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<Community | null> {
  let message = 'something went wrong!';

  try {
    console.log({ name });

    const { data: response } = await apolloClient.query({
      query: GET_COMMUNITY,
      variables: { name },
    });

    console.log({ response });

    if (
      response.GetCommunityResponse &&
      response.GetCommunityResponse.__typename === 'Community'
    ) {
      const data = response.GetCommunityResponse as Community;

      return data;
    }

    if (
      response.GetCommunityResponse &&
      response.GetCommunityResponse.__typename === 'CommunityError'
    ) {
      const { message: errorMessage } =
        response.GetCommunityResponse as CommunityError;

      message = errorMessage;
    }

    throw new Error(message);
  } catch (error) {
    console.log({ error });
    return null;
  }
}
