import { Dispatch, SetStateAction } from 'react';
import { SegmentedControl, Center, Box } from '@mantine/core';

import { AiOutlineStock } from 'react-icons/ai';
import { CgToday } from 'react-icons/cg';

import { FILTER } from 'types';

export type Props = {
  value: FILTER;
  setValue: Dispatch<SetStateAction<FILTER>>;
};

function Filters({ value, setValue }: Props) {
  const onChange = (labelValue: FILTER) => {
    setValue(labelValue);
  };

  return (
    <SegmentedControl
      transitionDuration={0}
      value={value}
      onChange={onChange}
      data={[
        {
          value: 'NEW' as FILTER,
          label: (
            <Center>
              <CgToday size={16} />
              <Box ml={10}>New</Box>
            </Center>
          ),
        },
        {
          value: 'TOP' as FILTER,
          label: (
            <Center>
              <AiOutlineStock size={16} />
              <Box ml={10}>Top</Box>
            </Center>
          ),
        },
      ]}
    />
  );
}

export default Filters;
