import { useContext, useState } from 'react';
import {
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  type TableProps,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import DeleteModal from '../Modal/DeleteModal';
import AdminsContext from '../../context/admins-context';

type AdminsTableProps = TableProps & {};

const AdminsTable = ({ className, ...rest }: AdminsTableProps) => {
  const [opened, setOpened] = useState({
    value: false,
    id: 0,
    itemTitle: '',
    itemIdentifier: '',
  });
  const ctx = useContext(AdminsContext);

  const rows = ctx.admins.map((admin) => (
    <tr key={admin.username}>
      <td>
        <Text size="sm" weight={500}>
          {admin.id}
        </Text>
      </td>

      <td>{admin.username}</td>

      <td>
        <Anchor<'a'>
          size="sm"
          href={`mailto:${admin.email}`}
          title={`Send email to ${admin.email}`}
        >
          {admin.email}
        </Anchor>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() =>
              setOpened({
                value: true,
                id: admin.id,
                itemTitle: 'administrator',
                itemIdentifier: admin.username,
              })
            }
          >
            <IconTrash size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea>
        <Table
          className={className}
          verticalSpacing="xs"
          horizontalSpacing="xs"
          highlightOnHover
          {...rest}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      <DeleteModal opened={opened} setOpened={setOpened} />
    </>
  );
};

export default AdminsTable;
