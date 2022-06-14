import { forwardRef, ReactNode } from 'react';
import { Group, Avatar, Text, Select } from '@mantine/core';

type ISelectData = {
  image: string;
  label: string;
  value: string;
};

type Props = {
  communities: Array<ISelectData>;
  onChange: (event: any) => void;
  value: string;
  error?: ReactNode;
};

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} sx={{ backgroundColor: 'white' }} />

        <div>
          <Text size="sm" transform="capitalize">
            {label}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

function SelectCommunity({ communities, value, onChange, error }: Props) {
  return (
    <>
      <Select
        placeholder="Choose a community"
        value={value}
        onChange={onChange}
        itemComponent={SelectItem}
        data={communities}
        maxDropdownHeight={400}
        nothingFound={
          communities.length
            ? 'Community available.'
            : "You're not part of any community."
        }
        filter={(value, item) =>
          item.label.toLowerCase().includes(value.toLowerCase().trim())
        }
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        searchable
        mb="md"
        allowDeselect
        required
      />
      {error}
    </>
  );
}

export default SelectCommunity;
