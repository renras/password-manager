import { toast } from "react-toastify";

export const errorToast = (message: string) => {
  toast.warn(message, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
