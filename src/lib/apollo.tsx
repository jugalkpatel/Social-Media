import { useMemo } from 'react';
import merge from 'deepmerge';
import type { GetServerSidePropsContext } from 'next';
import {
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client';
import isEqual from 'lodash.isequal';

import { cache } from 'lib';
import { PageProps } from 'types';

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'include',
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const {
        response: { headers },
      } = context;

      const cookies = headers.get('set-cookie');

      if (cookies) {
        ctx.req.headers.cookie = cookies;
      }

      return response;
    });
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link:
      typeof window === 'undefined' ? afterwareLink.concat(httpLink) : httpLink,
    // link: httpLink,
    cache,
  });
};

export function initializeApollo({ initialState = null, ctx = null }) {
  const client = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps,
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: PageProps) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state],
  );

  return store;
}
