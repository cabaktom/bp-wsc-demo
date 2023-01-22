import { ContextModalProps } from '@mantine/modals';

type EditModalProps = ContextModalProps<{
  modalBody: string;
}>;

const EditModal = ({ innerProps }: EditModalProps) => {
  return <>{innerProps.modalBody}</>;
};

export default EditModal;
