import { useState } from 'react';
import { Tabs, createStyles } from '@mantine/core';
import { CgToday } from 'react-icons/cg';
import { AiOutlineStock } from 'react-icons/ai';

type Props = {
  byVotes: React.ReactNode;
  byTime: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
}));

function Personalised({ byTime, byVotes }: Props) {
  const [filter, setFilter] = useState(0);
  const { classes } = useStyles();

  return (
    <>
      <Tabs
        active={filter}
        onTabChange={setFilter}
        grow={true}
        sx={{ position: 'sticky', top: 0 }}
      >
        <Tabs.Tab
          label="NEW"
          icon={<CgToday size={16} />}
          className={filter === 0 ? classes.background : null}
        >
          {byTime}
        </Tabs.Tab>
        <Tabs.Tab
          label="TOP"
          icon={<AiOutlineStock size={16} />}
          className={filter === 1 ? classes.background : null}
        >
          {byVotes}
        </Tabs.Tab>
      </Tabs>
    </>
  );
}

export default Personalised;
