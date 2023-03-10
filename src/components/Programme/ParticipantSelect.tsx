import { Select, type SelectProps } from '@mantine/core';

import ParticipantSelectItem from './ParticipantSelectItem';

type DayItemSelectProps = SelectProps & {
  label: string;
  placeholder: string;
  emptyPlaceholder: string;
  participantId?: string;
  abstractId?: string;
  setData: (participantId: string, abstractId: string) => void;
  data: any[];
};

const DayItemSelect = ({
  label,
  placeholder,
  emptyPlaceholder,
  participantId,
  abstractId,
  setData,
  data,
  ...others
}: DayItemSelectProps) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={`${participantId}__${abstractId || 'none'}`}
      onChange={(value) => {
        const [participantId, abstractId] = value?.split('__') ?? [
          undefined,
          undefined,
        ];

        setData(
          participantId ?? '',
          !abstractId || abstractId === 'none' ? '' : abstractId,
        );
      }}
      itemComponent={ParticipantSelectItem}
      data={data}
      maxDropdownHeight={400}
      nothingFound={emptyPlaceholder}
      filter={(value, item) =>
        item.fullName.toLowerCase().includes(value.toLowerCase()) ||
        item.abstractTitle?.toLowerCase().includes(value.toLowerCase())
      }
      allowDeselect
      searchable
      clearable
      zIndex={1000}
      {...others}
    />
  );
};

export default DayItemSelect;
