import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { initOtl } from "./otl-core/otl";
import { startWorkers } from "./workers/worker-helper";

const workers = startWorkers();
initOtl(workers);

const app = document.createElement("div");
document.body.appendChild(app);

const root = createRoot(app);
root.render(<App />);
