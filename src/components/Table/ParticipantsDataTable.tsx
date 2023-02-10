import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import {
  Container,
  Flex,
  Group,
  Stack,
  Text,
  createStyles,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { openContextModal } from '@mantine/modals';

import DataTable from './DataTable';
import MyButton from '../Button/MyButton';
import ParticipantForm from '../Form/ParticipantForm';
import useParticipants from '../../hooks/useParticipants';

const useStyles = createStyles(() => ({
  expandContainer: {
    boxShadow: 'inset 0 0 4px 0 rgba(221,221,221,1)',
  },
}));

type ParticipantsDataTableProps = {
  expandWidth: number;
};

const ParticipantsDataTable = ({ expandWidth }: ParticipantsDataTableProps) => {
  const { mutate } = useSWRConfig();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { participants } = useParticipants();

  // selected data
  const [selectedRecords, setSelectedRecords] = useState<typeof participants>(
    [],
  );

  const [expandedRecordIds, setExpandedRecordIds] = useState<number[]>([]);

  const expandAllRows = () => {
    setExpandedRecordIds(participants.map((participant) => participant.id));
  };

  const expandSelectedRows = () => {
    setExpandedRecordIds((prev) => [
      ...prev,
      ...selectedRecords.map((participant) => participant.id),
    ]);
  };

  const collapseAllRows = () => {
    setExpandedRecordIds([]);
  };

  const collapseSelectedRows = () => {
    const selectedIds = selectedRecords.map((participant) => participant.id);
    setExpandedRecordIds((prev) =>
      prev.filter((recordId) => !selectedIds.includes(recordId)),
    );
  };

  const handleDelete = () => {
    openContextModal({
      modal: 'delete',
      title: 'Delete selected participants',
      size: 'md',
      innerProps: {
        modalBody: (
          <Text size="sm">
            Are you sure you want to delete selected participants? By deleting a
            participant you will also delete the corresponding abstract. This
            action cannot be undone.
          </Text>
        ),
        subjectTitle: 'Participants',
        actionUrl: `/api/participants?ids=${selectedRecords.map(
          (participant) => participant.id,
        )}`,
      },
      onClose: () => {
        mutate('/api/participants');
        setSelectedRecords([]);
      },
    });
  };

  return (
    <Stack spacing="xs">
      <Group spacing="xs">
        <Group>
          <MyButton onClick={expandAllRows}>Expand all</MyButton>
          <MyButton
            onClick={expandSelectedRows}
            disabled={!selectedRecords.length}
          >
            Expand selected
          </MyButton>
        </Group>

        <Group>
          <MyButton
            onClick={collapseAllRows}
            disabled={!expandedRecordIds.length}
          >
            Collapse all
          </MyButton>
          <MyButton
            onClick={collapseSelectedRows}
            disabled={!selectedRecords.length}
          >
            Collapse selected
          </MyButton>
        </Group>

        <MyButton
          leftIcon={<IconTrash size={18} />}
          color="red"
          ml="auto"
          disabled={!selectedRecords.length}
          onClick={handleDelete}
        >
          {selectedRecords.length
            ? `Delete ${
                selectedRecords.length === 1
                  ? '1 selected record'
                  : `${selectedRecords.length} selected records`
              }`
            : 'Select records to delete'}
        </MyButton>
      </Group>

      <DataTable
        initialData={participants}
        sortStatus={{ columnAccessor: 'fullName', direction: 'asc' }}
        columns={[
          {
            accessor: 'number',
            title: '#',
            width: 30,
            render: (_, index) => index + 1,
          },
          {
            accessor: 'fullName',
            title: 'Full name',
            sortable: true,
            width: 150,
          },
          {
            accessor: 'affiliation',
            title: 'Affiliation',
            sortable: true,
            width: 200,
          },
          {
            accessor: 'student',
            title: 'Student',
            sortable: true,
            width: 110,
            render: (participant) => (
              <Flex>
                {participant.student ? (
                  <IconCheck color="green" />
                ) : (
                  <IconX color="darkred" />
                )}
              </Flex>
            ),
          },
          {
            accessor: 'abstract',
            title: 'Abstract',
            sortable: true,
            width: 110,
            render: (participant) => (
              <Flex>
                {participant.abstract ? (
                  <IconCheck color="green" />
                ) : (
                  <IconX color="darkred" />
                )}
              </Flex>
            ),
          },
          {
            accessor: 'participation',
            title: 'Participation',
            sortable: true,
            width: 130,
            render: (participant) => participant.participation.toLowerCase(),
          },
          {
            accessor: 'additionalMessage',
            title: 'Additional message',
            sortable: true,
            width: 300,
          },
        ]}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        rowExpansion={{
          allowMultiple: true,
          collapseProps: {
            transitionDuration: 100,
            animateOpacity: true,
          },
          expanded: {
            recordIds: expandedRecordIds,
            onRecordIdsChange: setExpandedRecordIds,
          },
          content: ({ record }) => (
            <Container
              className={classes.expandContainer}
              p={0}
              bg="gray.0"
              fluid
            >
              <Box
                pos="sticky"
                py="xs"
                pl="md"
                top={0}
                left={0}
                w={expandWidth - theme.spacing.md}
              >
                <ParticipantForm
                  participant={{
                    ...record,
                  }}
                />
              </Box>
            </Container>
          ),
        }}
      />
    </Stack>
  );
};

export default ParticipantsDataTable;
