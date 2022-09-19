export class EventEmitter {
  events = {};

  on(eventName, handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  emit(event) {
    const handlers = this.events[event.type];
    if (handlers) {
      for (let i = 0, len = handlers.length; i < len; i++) {
        handlers[i].handleEvent(event);
      }
    } else {
      throw new Error('Unknown event: ' + event.type);
    }
  }
}