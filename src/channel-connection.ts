export class ChannelConnection {
  private _id;

  constructor(private _port: MessagePort, private _from: string) {
    this._id = Math.floor(Math.random() * 1000000) + 1;
    console.log(`[${this._id}/${this._from}] connected`);
    _port.addEventListener("message", this._onMessage.bind(this));
  }

  public start() {
    this._port.start();
  }

  public postMessage(message: string) {
    this._port.postMessage(message);
  }

  private _onMessage(e: MessageEvent) {
    console.log(
      `[${this._id}/${this._from}]`,
      "Message received " + ": " + JSON.stringify(e.data)
    );
  }
}
