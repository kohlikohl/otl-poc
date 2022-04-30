import { ChannelConnection } from "../utils/channel-connection";

let pulsarConnection: ChannelConnection;
const name = "cdl";

onconnect = function (e) {
  var port = e.ports[0];

  const mainConnection = new ChannelConnection(port, "main", name);
  mainConnection.start();
  mainConnection.postMessage(`Hello from the CDL worker!`);

  port.addEventListener("message", (e: MessageEvent) => {
    switch (e.data.command) {
      case "connect-pulsar":
        pulsarConnection = new ChannelConnection(e.ports[0], "pulsar", name);
        pulsarConnection.start();

        // This message is passed from CDL to pulsar core worker directly
        pulsarConnection.postMessage("Message from CDL to Pulsar");
        break;
    }
  });
};
