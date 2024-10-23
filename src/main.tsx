import { createRoot } from "react-dom/client";
import "normalize.css";
import App from "./App.tsx";
import "./style/index.css";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
