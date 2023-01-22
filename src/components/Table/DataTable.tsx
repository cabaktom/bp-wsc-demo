import { useContext, useEffect, useState } from 'react';
import { DataTable as DT, DataTableSortStatus } from 'mantine-datatable';
import { Group, ActionIcon, createStyles } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { IconPencil, IconTrash } from '@tabler/icons';
import { z } from 'zod';
import sortBy from 'lodash/sortBy';

import AdminsContext from '../../context/admins-context';
import { AdminOut } from '../../schemas/Admin';
import EditAdminForm from '../Form/EditAdminForm';

const useStyles = createStyles(() => ({
  table: {
    minHeight: '30rem',
  },
}));

const PAGE_SIZES = [5, 10, 20, 50];

const DataTable = () => {
  const { classes } = useStyles();
  const ctx = useContext(AdminsContext);

  // pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZES[1]);
  // paginated data
  const [records, setRecords] = useState<z.infer<typeof AdminOut>[]>([]);
  // all data
  const [data, setData] = useState<z.infer<typeof AdminOut>[]>([]);

  useEffect(() => {
    const from = (page - 1) * perPage;
    const to = from + perPage;
    setRecords(data.slice(from, to));
  }, [page, perPage, data]);

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  // sorting
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'id',
    direction: 'asc',
  });

  useEffect(() => {
    const data = sortBy(ctx.admins, sortStatus.columnAccessor);
    setData(sortStatus.direction === 'asc' ? data : data.reverse());
  }, [sortStatus, ctx.admins]);

  // data init
  useEffect(() => {
    ctx.refreshAdmins();
    setData(ctx.admins);
  }, []);

  // delete action
  const handleDelete = (admin: z.infer<typeof AdminOut>) => {
    openContextModal({
      modal: 'delete',
      title: 'Delete admin',
      centered: true,
      size: 'auto',
      innerProps: {
        modalBody: `Are you sure you want to delete administrator ${admin.username} (ID: ${admin.id})?`,
        subjectId: admin.id,
        subjectTitle: 'Administrator',
        actionUrl: '/api/admins',
      },
      onClose: async () => {
        await ctx.refreshAdmins();
      },
    });
  };
  // edit action
  const handleEdit = (admin: z.infer<typeof AdminOut>) => {
    openContextModal({
      modal: 'edit',
      title: 'Edit admin',
      centered: true,
      innerProps: {
        modalBody: <EditAdminForm {...admin} />,
      },
      onClose: async () => {
        await ctx.refreshAdmins();
      },
    });
  };

  return (
    <>
      <DT
        className={classes.table}
        withBorder
        borderRadius="sm"
        highlightOnHover
        records={records}
        totalRecords={ctx.admins.length}
        page={page}
        recordsPerPage={perPage}
        onPageChange={(page) => setPage(page)}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} - ${to} of ${totalRecords}`
        }
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPerPage}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        columns={[
          { accessor: 'id', title: '#', sortable: true, width: '10%' },
          {
            accessor: 'username',
            title: 'Username',
            sortable: true,
            width: '30%',
            ellipsis: true,
          },
          {
            accessor: 'email',
            title: 'Email',
            sortable: true,
            width: '40%',
            ellipsis: true,
            render: (admin) => (
              <a
                href={`mailto:${admin.email}`}
                title={`Send email to ${admin.email}`}
              >
                {admin.email}
              </a>
            ),
          },
          {
            accessor: 'actions',
            title: '',
            textAlignment: 'right',
            sortable: false,
            width: '20%',
            render: (admin) => (
              <Group spacing={0} position="right">
                <ActionIcon onClick={() => handleEdit(admin)}>
                  <IconPencil size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => handleDelete(admin)}>
                  <IconTrash size={18} stroke={1.5} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
      />
    </>
  );
};

export default DataTable;
