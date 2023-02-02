import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { IconCheck, IconTrash, IconX } from '@tabler/icons';
import { Container, Group, Text, createStyles } from '@mantine/core';
import { openContextModal } from '@mantine/modals';

import DataTable from './DataTable';
import Button from '../Button/Button';
import ParticipantForm from '../Form/ParticipantForm';
import useParticipants from '../../hooks/useParticipants';

const useStyles = createStyles(() => ({
  expandContainer: {
    boxShadow: 'inset 0 0 4px 0 rgba(221,221,221,1)',
  },
}));

const ParticipantsDataTable = () => {
  const { mutate } = useSWRConfig();
  const { classes } = useStyles();
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
        subjectId: 0, // FIXME: provide array of IDs
        subjectTitle: 'Participants',
        actionUrl: '/api/participant',
      },
      onClose: () => mutate('/api/participants'),
    });
  };

  return (
    <>
      <Group spacing="xs">
        <Button onClick={expandAllRows}>Expand all</Button>
        <Button onClick={collapseAllRows}>Collapse all</Button>
        <Button onClick={expandSelectedRows} disabled={!selectedRecords.length}>
          Expand selected
        </Button>
        <Button
          onClick={collapseSelectedRows}
          disabled={!selectedRecords.length}
        >
          Collapse selected
        </Button>

        <Button
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
        </Button>
      </Group>

      <DataTable
        initialData={participants}
        columns={[
          {
            accessor: 'number',
            title: '#',
            width: '5%',
            render: (_, index) => index + 1,
          },
          {
            accessor: 'fullName',
            title: 'Full name',
            sortable: true,
            width: '15%',
          },
          {
            accessor: 'affiliation',
            title: 'Affiliation',
            sortable: true,
            width: '50%',
          },
          {
            accessor: 'student',
            title: 'Student',
            sortable: true,
            width: '5%',
            render: (participant) =>
              participant.student ? (
                <IconCheck color="green" />
              ) : (
                <IconX color="darkred" />
              ),
          },
          {
            accessor: 'abstract',
            title: 'Abstract',
            sortable: true,
            width: '5%',
            render: (participant) =>
              participant.abstract ? (
                <IconCheck color="green" />
              ) : (
                <IconX color="darkred" />
              ),
          },
          {
            accessor: 'participation',
            title: 'Participation',
            sortable: true,
            width: '10%',
            render: (participant) => participant.participation.toLowerCase(),
          },
          {
            accessor: 'additionalMessage',
            title: 'Additional message',
            sortable: true,
            width: '10%',
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
              p="md"
              bg="gray.0"
              fluid
            >
              <ParticipantForm
                participant={{
                  ...record,
                }}
              />
            </Container>
          ),
        }}
      />
    </>
  );
};

export default ParticipantsDataTable;
