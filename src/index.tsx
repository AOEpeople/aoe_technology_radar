import React from "react";
import {createRoot} from "react-dom/client";

import App from "./components/App";
import "./index.scss";
import ConfigProvider from "./context/ConfigContext/ConfigContext";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ConfigProvider>
            <App/>
        </ConfigProvider>
    </React.StrictMode>
);
