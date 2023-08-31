import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import ConfigProvider from "./context/ConfigContext/ConfigContext";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
