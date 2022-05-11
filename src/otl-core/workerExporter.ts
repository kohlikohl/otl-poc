import { ExportResult } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";
import { IManagedWorker } from "../workers/worker-helper";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { toJSON } from "flatted";

export class WorkerExporter implements SpanExporter {
  private _cache: ReadableSpan[] = [];
  private _exporter = new OTLPTraceExporter();

  constructor(private _workers: IManagedWorker) {}

  export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void
  ): void {
    // const req = toOTLPExportTraceServiceRequest(spans, this._exporter);
    this._workers.pulsar.postMessage({
      type: "span",
      spans: toJSON(spans),
    });
  }

  shutdown(): Promise<void> {
    console.log("--> shutdown");
    return;
  }
}
