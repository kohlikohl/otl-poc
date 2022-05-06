export class ChannelConnection {
  private _id;

  constructor(
    private _port: MessagePort,
    private _from: string,
    private _to: string
  ) {
    this._id = Math.floor(Math.random() * 1000000) + 1;
    this._logMessage("connected");
    _port.addEventListener("message", this._onMessage.bind(this));
  }

  public start() {
    this._port.start();
  }

  public postMessage(message: string) {
    this._port.postMessage(message);
  }

  public listen(cb: (e: MessageEvent) => void) {
    this._port.addEventListener("message", cb);
  }

  private _onMessage(e: MessageEvent) {
    this._logMessage("Message received " + ": " + JSON.stringify(e.data));
  }

  private _logMessage(...messages: any) {
    console.log(`[${this._to}:${this._id}/<-${this._from}]`, ...messages);
  }
}
