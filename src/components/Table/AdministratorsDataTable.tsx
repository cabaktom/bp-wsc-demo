import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { Group, ActionIcon, Text } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { z } from 'zod';

import { AdminOut } from '../../schemas/Admin';
import EditAdminForm from '../Form/EditAdminForm';
import DataTable from './DataTable';
import useAdministrators from '../../hooks/useAdministrators';

const AdministratorsDataTable = () => {
  const { mutate } = useSWRConfig();
  const { administrators } = useAdministrators();
  const { data: session } = useSession();

  const handleDelete = (admin: z.infer<typeof AdminOut>) => {
    openContextModal({
      modal: 'delete',
      title: 'Delete administrator',
      size: 'auto',
      innerProps: {
        modalBody: `Are you sure you want to delete administrator ${admin.username}?`,
        subjectId: admin.id,
        subjectTitle: 'Administrator',
        actionUrl: '/api/admins',
      },
      onClose: () => mutate('/api/admins'),
    });
  };

  const handleEdit = (admin: z.infer<typeof AdminOut>) => {
    openContextModal({
      modal: 'edit',
      title: 'Edit administrator',
      size: 'sm',
      innerProps: {
        modalBody: <EditAdminForm {...admin} />,
      },
    });
  };

  return (
    <>
      <DataTable
        initialData={administrators}
        columns={[
          {
            accessor: 'number',
            title: '#',
            width: '5%',
            render: (_, index) => index + 1,
          },
          {
            accessor: 'username',
            title: 'Username',
            sortable: true,
            width: '35%',
            ellipsis: true,
            render: (admin) => {
              if (admin.username === session?.user?.username) {
                return (
                  <Text weight="bold" color="materialBlue">
                    {admin.username}
                  </Text>
                );
              }
              return admin.username;
            },
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
