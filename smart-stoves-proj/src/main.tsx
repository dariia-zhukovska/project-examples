import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";
import Toast from "./components/common/toast/Toast.tsx";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toast />
  </Provider>
);
