import { fromJSON } from "flatted";
import { ChannelConnection } from "../utils/channel-connection";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

let cdlConnection;
const name = "pulsar";

const otlpExporter = new OTLPTraceExporter({
  url: "http://localhost:55681/v1/traces",
});

onconnect = function (e) {
  var port = e.ports[0];

  const mainConnection = new ChannelConnection(port, "main", name);
  mainConnection.start();
  mainConnection.postMessage(`Hello from the Pulsar worker!`);
  mainConnection.listen(incomingMessageHandler);

  port.addEventListener("message", (e: MessageEvent) => {
    switch (e.data.command) {
      case "connect-cdl":
        cdlConnection = new ChannelConnection(e.ports[0], "cdl", name);
        cdlConnection.start();
        cdlConnection.listen(incomingMessageHandler);
        break;
    }
  });
};

const incomingMessageHandler = (e: MessageEvent) => {
  if (e.data.type === "span") {
    console.log("---> SPAN received");
    const spans = fromJSON(e.data.spans);
    console.log("--> spans:", spans);

    otlpExporter.send(
      spans,
      () => {
        console.log("--> OTLP exporter success");
      },
      (err) => {
        console.log("--> OTLP exporter error:", err);
      }
    );
  }
};
