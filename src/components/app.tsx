import { Tracer } from "@opentelemetry/sdk-trace-base";
import React, { useEffect } from "react";
import { IOTLContext, OTLContext } from "./context";

interface IAppProps {
  context: any;
  tracer: Tracer;
}
export const App = ({ context, tracer }: IAppProps) => {
  const [visible, setVisibility] = React.useState(false);

  /**
   * See this example on how to connect the react tree to a parent span:
   * https://github.com/open-telemetry/opentelemetry-js-contrib/blob/d39c64279db5aaebd469e6c93bcd9b9fce558a1e/plugins/web/opentelemetry-plugin-react-load/src/BaseOpenTelemetryComponent.ts#L81
   *
   * This parent span can be set onto the react context and re-created when the context is re-created.
   *
   */

  return (
    <OTLContext.Provider value={{ context, tracer }}>
      <h1>Main renderer</h1>
      <button onClick={() => setVisibility(!visible)}>Show content</button>
      {visible && <ContentComponentWithContext />}
    </OTLContext.Provider>
  );
};

const ContentComponentWithContext = () => {
  return (
    <OTLContext.Consumer>
      {(context) => {
        return <ContentComponent context={context} />;
      }}
    </OTLContext.Consumer>
  );
};

const ContentComponent = (props: { context: IOTLContext }) => {
  const { context, tracer } = props.context;
  const span = tracer.startSpan("content-component", {}, context);

  React.useEffect(() => {
    span.end();
  }, []);

  return <p>I am rendering this content</p>;
};
