import { showNotification, updateNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

export type ProgressNotificationsParams = {
  start: (startMessage: string) => void;
  success: (successMessage: string) => void;
  error: (errorMessage: string) => void;
};

function showProgressNotifications() {
  const start = (startMessage: string) => {
    showNotification({
      id: 'load-data',
      loading: true,
      autoClose: false,
      message: startMessage,
      disallowClose: true,
    });
  };

  const success = (successMessage: string) => {
    updateNotification({
      id: 'load-data',
      color: 'green',
      message: successMessage,
      icon: <IoMdCheckmark />,
      autoClose: 2000,
    });
  };

  const error = (errorMessage: string) => {
    updateNotification({
      id: 'load-data',
      color: 'red',
      message: errorMessage,
      icon: <IoMdClose />,
      autoClose: 2000,
    });
  };

  return { start, success, error };
}

export default showProgressNotifications;
