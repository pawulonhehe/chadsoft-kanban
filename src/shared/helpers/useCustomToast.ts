import { toast } from 'react-toastify';

export const useCustomToast = (text: string) =>
  toast.success(text, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
