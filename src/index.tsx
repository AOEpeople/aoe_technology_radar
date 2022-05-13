import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
