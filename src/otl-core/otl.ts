import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WorkerExporter } from "./workerExporter";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { IManagedWorker } from "../workers/worker-helper";

export const initOtl = (workers: IManagedWorker) => {
  const provider = new WebTracerProvider({
    //   sampler,
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]:
        typeof window === "undefined"
          ? "teams-central-data-layer"
          : "teams-client",
    }),
  });
  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  });

  provider.addSpanProcessor(
    new SimpleSpanProcessor(new WorkerExporter(workers))
  );

  registerInstrumentations({
    instrumentations: [new DocumentLoadInstrumentation()],
  });
};
