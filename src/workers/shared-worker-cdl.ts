import { ChannelConnection } from "../channel-connection";

let pulsarConnection: ChannelConnection;

onconnect = function (e) {
  var port = e.ports[0];

  const mainConnection = new ChannelConnection(port, "main");
  mainConnection.start();
  mainConnection.postMessage(`Hello from the CDL worker!`);

  port.addEventListener("message", (e: MessageEvent) => {
    switch (e.data.command) {
      case "connect-pulsar":
        pulsarConnection = new ChannelConnection(e.ports[0], "pulsar");
        pulsarConnection.start();

        // this.self.setTimeout(() => {
        pulsarConnection.postMessage("Message from CDL to Pulsar");
        // }, 5000);
        break;
    }
  });
};
