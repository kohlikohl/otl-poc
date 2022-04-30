
# Pulsar Telemetry backend

Backend for Pulsar telemetry. Consist of :
- `Open telemetry collector` is vendor-agnostic implementation on how to receive, process, and export telemetry data. 
- `Jaeger` is open source, end-to-end distributed tracing.
- `Zipkin` is a distributed tracing system.
- `Prometheus` is an open-source monitoring system with a dimensional data model, flexible query language, efficient time series database and modern alerting approach.

## Run

Run in this folder command in terminal `docker-compose up`.

### Troubleshooting

On Windows: if you see errors on the command line about ports like this: 
Error response from daemon: Ports are not available: listen tcp 0.0.0.0:55680: bind: An attempt was made to access a socket in a way forbidden by its access permissions.

Follow instructions here to check and change Hyper-V port allocation: https://stackoverflow.com/questions/57316744/docker-sql-bind-an-attempt-was-made-to-access-a-socket-in-a-way-forbidden-by-**it**
## UI

Jaeger UI: http://localhost:16686/ 

Note: in Jaeger, use the 'service' dropdown to find the Teams data stream. Look for anything with Teams in the name...

Zipkin UI: http://localhost:9411/ 

Prometheus UI: http://localhost:9090/ 