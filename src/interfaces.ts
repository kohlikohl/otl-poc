import { ReadableSpan } from "@opentelemetry/sdk-trace-base";

export interface IOtlIPCMessage {
  type: "span" | "metric";
  data: ReadableSpan[];
}
