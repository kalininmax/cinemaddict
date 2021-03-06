class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => {
      return existedObserver !== observer;
    });
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => {
      return observer(event, payload);
    });
  }
}

export { Observer as default };
