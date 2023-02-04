import { ModalsProvider, type ModalsProviderProps } from '@mantine/modals';

import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

type MyModalsProviderProps = ModalsProviderProps;

const MyModalsProvider = ({ children, ...rest }: MyModalsProviderProps) => {
  return (
    <ModalsProvider
      labels={{ confirm: 'Submit', cancel: 'Cancel' }}
      modals={{ delete: DeleteModal, edit: EditModal }}
      modalProps={{ zIndex: 1000, centered: true }}
      {...rest}
    >
      {children}
    </ModalsProvider>
  );
};

export default MyModalsProvider;
