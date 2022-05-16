import { Tracer } from "@opentelemetry/sdk-trace-base";
import React, { useEffect } from "react";

export interface IOTLContext {
  context: any;
  tracer: Tracer;
}
export const OTLContext = React.createContext<IOTLContext>({
  context: null,
  tracer: null,
});
