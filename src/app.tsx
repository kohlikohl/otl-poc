import React, { useEffect } from "react";
import { ManageWorker } from "./utils/manage-worker";

export const App = () => {
  useEffect(() => {
    startWorkers();
  }, []);

  return <h1>Main renderer</h1>;
};

const startWorkers = () => {
  // start pulsar shared worker
  const pulsarWorker = new ManageWorker(
    "main-renderer",
    "./shared-worker-pulsar.js"
  );
  pulsarWorker.start();

  // start cdl shared worker
  const cdlWorker = new ManageWorker("main-renderer", "./shared-worker-cdl.js");
  cdlWorker.start();

  // connect cdl and pulsar workers directly via MessageChannel
  const channel = new MessageChannel();
  pulsarWorker.postMessage({ command: "connect-cdl" }, [channel.port1]);
  cdlWorker.postMessage({ command: "connect-pulsar" }, [channel.port2]);
};
