import {
  ModalsProvider as MantineModalsProvider,
  type ModalsProviderProps as MantineModalsProviderProps,
} from '@mantine/modals';

import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

type ModalsProviderProps = MantineModalsProviderProps;

const ModalsProvider = ({ children, ...rest }: ModalsProviderProps) => {
  return (
    <MantineModalsProvider
      labels={{ confirm: 'Submit', cancel: 'Cancel' }}
      modals={{ delete: DeleteModal, edit: EditModal }}
      modalProps={{ zIndex: 1000, centered: true }}
      {...rest}
    >
      {children}
    </MantineModalsProvider>
  );
};

export default ModalsProvider;
