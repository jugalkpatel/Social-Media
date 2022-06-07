import { useModals } from '@mantine/modals';

type Props = {
  data: {
    title: string;
    children?: React.ReactNode;
    labels: { confirm: string; cancel: string };
    onCancel: () => void;
    onConfirm: () => void;
  };
};

function useOpenConfirmModal({
  data: { title, children, labels, onCancel, onConfirm },
}: Props) {
  const modals = useModals();

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title,
      centered: true,
      children,
      labels,
      confirmProps: { color: 'red' },
      onCancel,
      onConfirm,
    });
  return openConfirmModal;
}

export { useOpenConfirmModal };
