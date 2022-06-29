import { useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { setGlobalDateMasks } from 'fecha';

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Global,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import theme from '../styles/theme';

import { useApollo } from 'lib';
import { Layout, Login, Register, CreateCommunity } from 'components';

import 'normalize.css/normalize.css';

setGlobalDateMasks({
  timeFormat: '[on] MMMM Do, YY · hh:mm A',
});

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
                  COMMUNITY: CreateCommunity,
                }}
                modalProps={{ centered: true }}
              >
                <Global
                  styles={(theme) => ({
                    body: {
                      backgroundColor:
                        theme.colorScheme === 'light'
                          ? theme.colors.gray[2]
                          : theme.colors.dark[9],
                    },
                  })}
                />
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
