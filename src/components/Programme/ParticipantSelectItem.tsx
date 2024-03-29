import { Badge, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

import type { ParticipantType } from '../../@types/programme';

type ParticipantSelectItemProps = ParticipantType &
  React.HTMLAttributes<HTMLDivElement>;

const ParticipantSelectItem = forwardRef<
  HTMLDivElement,
  ParticipantSelectItemProps
>(
  (
    {
      fullName,
      abstractTitle,
      invited,
      participation,
      message,
      ...others
    }: ParticipantSelectItemProps,
    ref,
  ) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Group spacing={4} mb={6}>
              <Text size="sm" fw="bold" mr={6}>
                {fullName}
              </Text>

              {invited && (
                <Badge size="xs" variant="filled">
                  Invited
                </Badge>
              )}

              {participation === 'ONLINE' && (
                <Badge size="xs" variant="filled" color="green">
                  {participation}
                </Badge>
              )}
            </Group>

            <Text size="xs" opacity={0.8}>
              {abstractTitle || 'No abstract'}
            </Text>

            {message && (
              <Text size="xs" opacity={0.8} fs="italic">
                {message}
              </Text>
            )}
          </div>
        </Group>
      </div>
    );
  },
);

export default ParticipantSelectItem;
