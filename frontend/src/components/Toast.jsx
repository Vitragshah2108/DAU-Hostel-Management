import { toast } from 'react-hot-toast';

/**
 * Toast utility wrapper
 * Provides reusable toast notifications.
 * @example
 * Toast.success('Saved!');
 */
const Toast = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast(msg),
};

export default Toast;


