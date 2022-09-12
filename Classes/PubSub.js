class PubSub {
  events = {};

  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    console.log(this.events);
  }

  publish(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      for (let i = 0, len = event.length; i < len; i++) {
        event[i](eventName, data);
      }
    } else {
      throw new Error('Unknown event: ' + eventName);
    }
  }
}

export const TableEvents = new PubSub();