import { showNotification } from '@mantine/notifications';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

export type CommonNotificationParms = {
  success: (message: string) => void;
  error: (message: string) => void;
};

function useCommonNotifications() {
  const success = (message: string) => {
    showNotification({
      message: message,
      autoClose: 3000,
      icon: <IoMdCheckmark />,
      color: 'green',
    });
  };

  const error = (message: string) => {
    showNotification({
      message: message,
      autoClose: 3000,
      icon: <IoMdClose />,
      color: 'red',
    });
  };

  return { success, error };
}

export default useCommonNotifications;
