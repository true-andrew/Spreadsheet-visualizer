import {EventEmitter} from "./EventEmitter.js";

export class BaseComponent extends EventEmitter {
  constructor(options) {
    super();
    this.registerOptions(options);
    this.init();
  }

  container = undefined;
  mountPoint = undefined;

  registerOptions(options) {
    const optionsKeys = Object.keys(options);
    for (let i = 0, len = optionsKeys.length; i < len; i++) {
      const optionName = optionsKeys[i];
      this[optionName] = options[optionName];
    }
  }

  init() {
    if (!this.mountPoint instanceof HTMLElement) {
      throw new Error(`Неверная точка монтирования: ${this.mountPoint}`);
    }
    this.initContainer();
    this.render();
  }

  initContainer() {
  }

  render() {
    this.mountPoint.append(this.container);
  }
}