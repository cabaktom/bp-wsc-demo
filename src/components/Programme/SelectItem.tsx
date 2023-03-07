import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

import type { ParticipantType } from '../../@types/programme';

type SelectItemProps = ParticipantType & React.HTMLAttributes<HTMLDivElement>;

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ fullName, abstractTitle, ...others }: SelectItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm" fw="bold">
              {fullName}
            </Text>
            <Text size="xs" opacity={0.7}>
              {abstractTitle || 'No abstract'}
            </Text>
          </div>
        </Group>
      </div>
    );
  },
);

export default SelectItem;
