import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "normalize.css";
import App from "./App.tsx";
import store from "./store";
import "./style/index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
