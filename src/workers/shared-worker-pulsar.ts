import { ChannelConnection } from "../channel-connection";

let cdlConnection;

onconnect = function (e) {
  var port = e.ports[0];

  const mainConnection = new ChannelConnection(port, "main");
  mainConnection.start();
  mainConnection.postMessage(`Hello from the Pulsar worker!`);

  port.addEventListener("message", (e: MessageEvent) => {
    switch (e.data.command) {
      case "connect-cdl":
        cdlConnection = new ChannelConnection(e.ports[0], "cdl");
        cdlConnection.start();
        break;
    }
  });
};