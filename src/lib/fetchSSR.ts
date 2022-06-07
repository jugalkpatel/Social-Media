import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { IncomingMessage, ServerResponse } from 'http';
import { ApolloError } from '@apollo/client';

// if access token is valid: send isAuthentication true,
// if expired send: check refresh token if it's valid send true
// for all other cases send false

import { isTokenExpired } from 'lib';

type AuthError = {
  __typename: string;
  message: string;
};

type IRefresh = {
  success: boolean;
};

type IUser = {
  __typename: string;
  id: string;
  name: string;
};

type IData = {
  id: string;
  name: string;
};

const REFRESH = gql`
  mutation Refresh {
    refresh {
      ... on IRefresh {
        success
        __typename
      }
      ... on AuthError {
        message
        __typename
      }
    }
  }
`;

const ACCESS = gql`
  mutation Authenticate {
    authenticate {
      ... on AuthPayload {
        user {
          id
          name
          picture
          __typename
        }
      }
      ... on AuthError {
        message
        __typename
      }
    }
  }
`;

function getCookie(req: IncomingMessage): string {
  return req ? req.headers.cookie : '';
}

function access(
  cookie: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  return apolloClient.mutate({
    mutation: ACCESS,
    context: { headers: { cookie } },
  });
}

function extractErrorMessage(response) {
  let message = 'something went wrong!';

  if (
    response &&
    response?.authenticate &&
    response?.authenticate?.__typename === 'AuthError'
  ) {
    const { message: errorMessage } = response.authenticate as AuthError;

    message = errorMessage;
  }

  return message;
}

async function refresh(
  cookie: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: REFRESH,
      context: { headers: { cookie } },
    });

    if (!data || !data?.refresh || data?.refresh?.__typename === 'AuthError') {
      const { message } = data.refresh as AuthError;

      if (message) {
        return { success: false };
      }
    }

    const { success } = data.refresh as IRefresh;

    return { success };
  } catch (error) {
    return { success: false };
  }
}

export async function handleAuth(
  req: IncomingMessage,
  apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<IData | { authenticated: boolean }> {
  const cookie = getCookie(req);
  try {
    if (!cookie) {
      return { authenticated: false };
    }

    const { data: accessResponse } = await access(cookie, apolloClient);

    console.log({ accessResponse });

    if (
      accessResponse &&
      accessResponse?.authenticate &&
      accessResponse?.authenticate?.__typename === 'AuthPayload'
    ) {
      const { id, name } = accessResponse.authenticate.user as IUser;

      return { id, name };
    }

    const message = extractErrorMessage(accessResponse);

    throw new Error(message);
  } catch (error) {
    console.log({ error });
    if (error instanceof ApolloError) {
      const expired = isTokenExpired(error);

      if (expired) {
        const { success } = await refresh(cookie, apolloClient);

        if (success) {
          const newCookie = getCookie(req);

          const { data: accessResponse } = await access(
            newCookie,
            apolloClient,
          );

          if (
            accessResponse &&
            accessResponse?.authenticate &&
            accessResponse?.authenticate?.__typename === 'AuthPayload'
          ) {
            const { id, name } = accessResponse.authenticate.user as IUser;

            return { id, name };
          }
        }
      }
    }

    return { authenticated: false };
  }
}

// if (
//   accessResponse &&
//   accessResponse?.authenticate &&
//   accessResponse?.authenticate?.__typename === 'AuthError'
// ) {
//   const { message: errorMessage } =
//     accessResponse.authenticate as AuthError;

//   message = errorMessage;
// }

// make a function that calls to mutation

// check: refresh route
// refresh token failed
// case where there were no cookies

// export async function fetchSSR(
//   req: IncomingMessage,
//   res: ServerResponse,
//   apolloClient: ApolloClient<NormalizedCacheObject>,
// ): Promise<IData | null> {
//   const cookie = getCookie(req);

//   console.log(`before infetchSSR: ${cookie}`);

//   try {
//     const { data: accessResponse } = await access(cookie, apolloClient);

//     if (
//       accessResponse &&
//       accessResponse?.authenticate &&
//       accessResponse?.authenticate?.__typename === 'AuthPayload'
//     ) {
//       const { id, name } = accessResponse.authenticate.user as IUser;

//       console.log({ id, name });

//       return { id, name };
//     }

//     const message = extractErrorMessage(accessResponse);

//     throw new Error(message);
//   } catch (error) {
//     if (error instanceof ApolloError) {
//       const expired = isTokenExpired(error);

//       if (expired) {
//         console.log('in refreshToken');
//         const { success } = await refresh(cookie, apolloClient);

//         console.log({ success });

//         if (success) {
//           const newCookie = getCookie(req);

//           console.log({ newCookie });

//           const { data: accessResponse } = await access(
//             newCookie,
//             apolloClient,
//           );

//           console.log({ accessResponse });

//           if (
//             accessResponse &&
//             accessResponse?.authenticate &&
//             accessResponse?.authenticate?.__typename === 'AuthPayload'
//           ) {
//             const { id, name } = accessResponse.authenticate.user as IUser;

//             return { id, name };
//           }
//         }
//       }
//     }

//     return null;
//   }
// }
