import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactComponent as ErrorIcon } from "../../../assets/svg/toast-error-icon.svg";

import styles from "./styles.module.scss";
import "./custom_toasts.scss";

export const successToast = {
  position: toast.POSITION.BOTTOM_CENTER,
  className: "successToast",
  closeOnClick: true,
  autoClose: 2500,
};

export const errorToast = {
  position: toast.POSITION.BOTTOM_CENTER,
  className: "errorToast",
  closeOnClick: true,
  autoClose: 2500,
  icon: <ErrorIcon />,
};

const Toast: React.FC = () => {
  return (
    <ToastContainer
      className={styles.toastContainer}
      position="bottom-center"
      autoClose={2500}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="colored"
      limit={1}
    />
  );
};

export default Toast;
