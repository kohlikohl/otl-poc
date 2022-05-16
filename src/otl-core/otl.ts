import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WorkerExporter } from "./workerExporter";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { IManagedWorker } from "../workers/worker-helper";
import { context, trace, Span, SpanStatusCode } from "@opentelemetry/api";

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

  const tracer = provider.getTracer("custom-tracer");

  return {
    getUIContext: (defaultContext) => {
      const uiSpan = tracer.startSpan(`React Root`, undefined, defaultContext);
      uiSpan.end();
      return trace.setSpan(defaultContext, uiSpan);
    },
    tracer,
    trace: function <F extends (...args: any) => ReturnType<F>>(
      name: string,
      func: F
    ): Promise<ReturnType<F>> {
      var singleSpan = tracer.startSpan(name);
      return context.with(
        trace.setSpan(context.active(), singleSpan),
        async () => {
          try {
            const result = await func();
            singleSpan.end();
            return result;
          } catch (error) {
            singleSpan.setStatus({ code: SpanStatusCode.ERROR });
            singleSpan.end();
            throw error;
          }
        }
      );
    },
  };
};
