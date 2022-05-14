import React, { useEffect } from "react";

export const App = () => {
  useEffect(() => {}, []);

  /**
   * See this example on how to connect the react tree to a parent span:
   * https://github.com/open-telemetry/opentelemetry-js-contrib/blob/d39c64279db5aaebd469e6c93bcd9b9fce558a1e/plugins/web/opentelemetry-plugin-react-load/src/BaseOpenTelemetryComponent.ts#L81
   *
   * This parent span can be set onto the react context and re-created when the context is re-created.
   *
   */

  return <h1>Main renderer</h1>;
};
