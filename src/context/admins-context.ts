/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { z } from 'zod';
import { AdminOut } from '../schemas/Admin';

const AdminsContext = createContext({
  admins: [] as z.infer<typeof AdminOut>[],
  setAdmins: (admins: z.infer<typeof AdminOut>[]) => {},
  refreshAdmins: async () => {},
});

export default AdminsContext;
