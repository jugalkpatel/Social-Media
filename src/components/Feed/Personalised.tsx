import { useState } from 'react';
import { Tabs, TabsProps } from '@mantine/core';
import { CgToday } from 'react-icons/cg';
import { AiOutlineStock } from 'react-icons/ai';

type Props = {
  byVotes: React.ReactNode;
  byTime: React.ReactNode;
};

function Personalised({ byTime, byVotes }: Props) {
  const [filter, setFilter] = useState(0);

  return (
    <>
      <Tabs
        active={filter}
        onTabChange={setFilter}
        grow={true}
        sx={{ position: 'sticky', top: 0 }}
      >
        <Tabs.Tab label="NEW" icon={<CgToday size={16} />}>
          {byTime}
        </Tabs.Tab>
        <Tabs.Tab label="TOP" icon={<AiOutlineStock size={16} />}>
          {byVotes}
        </Tabs.Tab>
      </Tabs>
    </>
  );
}

export default Personalised;
