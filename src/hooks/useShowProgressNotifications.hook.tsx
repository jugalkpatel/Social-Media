import { showNotification, updateNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

type Props = {
  id: string;
  time?: number;
};

export type ProgressNotificationsParams = {
  start: (startMessage: string) => void;
  success: (successMessage: string) => void;
  error: (errorMessage: string) => void;
};

function useShowProgressNotifications({ id, time }: Props) {
  const start = (startMessage: string) => {
    showNotification({
      id,
      loading: true,
      autoClose: false,
      message: startMessage,
      disallowClose: true,
    });
  };

  const success = (successMessage: string) => {
    updateNotification({
      id,
      color: 'green',
      message: successMessage,
      icon: <IoMdCheckmark />,
      autoClose: time || 2000,
    });
  };

  const error = (errorMessage: string) => {
    updateNotification({
      id,
      color: 'red',
      message: errorMessage,
      icon: <IoMdClose />,
      autoClose: time || 2000,
    });
  };

  return { start, success, error };
}

export default useShowProgressNotifications;
