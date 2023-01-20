import { useState } from 'react';
import { z } from 'zod';

import AdminsContext from './admins-context';
import { AdminOut } from '../schemas/Admin';

type AdminsProviderProps = {
  children: React.ReactNode;
};

const AdminsProvider = ({ children }: AdminsProviderProps) => {
  const [admins, setAdmins] = useState<z.infer<typeof AdminOut>[]>([]);

  const handleSetAdmins = (admins: z.infer<typeof AdminOut>[]) => {
    setAdmins(admins);
  };

  const handleRefreshAdmins = async () => {
    const res = await fetch('/api/admins');
    const data = await res.json();
    setAdmins(data);
  };

  const adminsContext = {
    admins,
    setAdmins: handleSetAdmins,
    refreshAdmins: handleRefreshAdmins,
  };

  return (
    <AdminsContext.Provider value={adminsContext}>
      {children}
    </AdminsContext.Provider>
  );
};

export default AdminsProvider;
