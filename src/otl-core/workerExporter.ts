import { ExportResult } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";

export class WorkerExporter implements SpanExporter {
  constructor() {}

  export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void
  ): void {
    console.log("--> export", spans);
  }

  shutdown(): Promise<void> {
    console.log("--> shutdown");
    return;
  }
}
