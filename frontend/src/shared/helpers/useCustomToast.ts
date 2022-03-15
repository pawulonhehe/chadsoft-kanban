import { toast, TypeOptions } from 'react-toastify';

type UseCustomToastType = {
  text: string;
  type: TypeOptions;
};

export const useCustomToast = ({ text, type }: UseCustomToastType) =>
  toast.success(text, {
    type,
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
