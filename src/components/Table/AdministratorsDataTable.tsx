import { useContext, useEffect } from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { IconPencil, IconTrash } from '@tabler/icons';
import { z } from 'zod';

import AdminsContext from '../../context/admins-context';
import { AdminOut } from '../../schemas/Admin';
import EditAdminForm from '../Form/EditAdminForm';
import DataTable from './DataTable';

const AdministratorsDataTable = () => {
  const ctx = useContext(AdminsContext);

  useEffect(() => {
    ctx.refreshAdmins();
  }, []);

  const handleDelete = (admin: z.infer<typeof AdminOut>) => {
    openContextModal({
      modal: 'delete',
      title: 'Delete administrator',
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

  const handleEdit = (admin: z.infer<typeof AdminOut>) => {
    openContextModal({
      modal: 'edit',
      title: 'Edit administrator',
      centered: true,
      size: 'xs',
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
      <DataTable
        initialData={ctx.admins}
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

export default AdministratorsDataTable;
