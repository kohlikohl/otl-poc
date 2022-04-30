import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./otl-core/otl";

const app = document.createElement("div");
document.body.appendChild(app);

const root = createRoot(app);
root.render(<App />);
