import { MediaQuery, Skeleton, Text, Stack } from '@mantine/core';

import { useCommunityMembers } from 'operations';

type Props = {
  title: string;
};

function MemberCount({ title }: Props) {
  const { members, state } = useCommunityMembers({ title });

  return (
    <>
      {state === 'ERROR' ? null : (
        <Skeleton visible={state === 'LOADING'} sx={{ width: 'fit-content' }}>
          <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
            <Stack sx={{ gap: 0 }}>
              <Text weight={700}>{members.length}</Text>
              <Text size="sm">Members</Text>
            </Stack>
          </MediaQuery>

          <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
            <Text size="md" weight={700} align="center" py={'10px'}>
              {members.length} members
            </Text>
          </MediaQuery>
        </Skeleton>
      )}
    </>
  );
}

export default MemberCount;
