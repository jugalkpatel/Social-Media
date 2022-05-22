import { useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import theme from '../styles/theme';

import '../lib/i18n';
import { useApollo } from '../lib/apollo';
import { Layout, Login, Register, CreateCommunityModal } from 'components';

import 'normalize.css/normalize.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Rices</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme: colorScheme === 'dark' ? 'dark' : 'light',
              ...theme,
            }}
            defaultProps={{
              Button: { color: 'orange' },
              ActionIcon: { color: 'orange' },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <ModalsProvider
                modals={{
                  LOGIN: Login,
                  REGISTER: Register,
                  COMMUNITY: CreateCommunityModal,
                }}
                modalProps={{ centered: true }}
              >
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
