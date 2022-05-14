import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { initOtl } from "./otl-core/otl";
import { startWorkers } from "./workers/worker-helper";

const workers = startWorkers();
const otl = initOtl(workers);

const app = document.createElement("div");
document.body.appendChild(app);

const root = createRoot(app);
root.render(<App />);

otl.trace("Client test trace", async () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      otl.trace(`nested test trace ${i}`, () => {
        let j = 0;
        while (j < 1000000 * i) {
          j++;
        }
      });
    }, 1000);
  }
});
