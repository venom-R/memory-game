export class Emitter {
    constructor() {
        this._events = {};
    }

    on(type, listener) {
        this._events[type] = this._events[type] || [];
        this._events[type].push(listener);
    }

    off(type, listener) {
        if (this._events[type]) {
            this._events[type].filter((fn) => fn !== listener);
        }
    }

    emit(type, ...args) {
        if (this._events[type]) {
            this._events[type].forEach((listener) => {
                listener(...args);
            });
        }
    }
}
