export class ManageWorker {
  private _worker: SharedWorker;

  constructor(private _type: string, private _scriptUrl: string) {}

  public start() {
    this._worker = new SharedWorker(this._scriptUrl);
    this._worker.port.start();

    this._worker.port.onmessage = (e: MessageEvent) => {
      console.log(e.data);
    };

    this._worker.port.postMessage(`Hello from ${this._type}`);
  }

  public postMessage(message: any, transfer?: Transferable[]) {
    this._worker.port.postMessage(message, transfer);
  }
}
