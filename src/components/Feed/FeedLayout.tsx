import { useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { Tabs, createStyles, Stack, Text, MediaQuery } from '@mantine/core';

import { ContainerLayout } from 'components';
import { authorizationVar } from 'lib';

type Props = {
  children: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    padding: '0.5rem 0',

    [theme.fn.largerThan('lg')]: {
      gridTemplateColumns: '2.3fr 1fr',
      gridTemplateRows: 'minmax(max-content, 300px) 1fr',
      gap: '0.7rem',
      padding: '1rem 0',
    },
  },
  border: {
    border: `1px solid ${
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[6]
    }`,
    borderRadius: '0.3rem',
  },
}));

function FeedLayout({ children }: Props) {
  const { classes } = useStyles();
  // const [activeTab, setActiveTab] = useState(0);
  // const isAuthorized = useReactiveVar(authorizationVar);

  // const onChange = (active: number, tabKey: string) => {
  //   setActiveTab(active);
  // };

  return (
    <ContainerLayout>
      <div className={classes.grid}>
        <Stack sx={{ gridRow: '1/-1' }}>
          {/* <Tabs active={activeTab} onTabChange={onChange}>
            {isAuthorized ? (
              <Tabs.Tab label="For you" tabKey="first">
                First Tab
              </Tabs.Tab>
            ) : null}

            <Tabs.Tab label="Popular" tabKey="second">
            </Tabs.Tab>
          </Tabs> */}
          {/* {popular} */}
          {children}
        </Stack>

        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <Stack className={classes.border} p="md" sx={{ gridRow: '1/2' }}>
            <Text>Featured Communities</Text>
          </Stack>
        </MediaQuery>
      </div>
    </ContainerLayout>
  );
}

export default FeedLayout;
