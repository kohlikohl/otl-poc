import { ManageWorker } from "../utils/manage-worker";

export interface IManagedWorker {
  pulsar: {
    postMessage(message: any, transfer?: Transferable[]): void;
  };
}

export const startWorkers = (): IManagedWorker => {
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

  return { pulsar: pulsarWorker };
};
