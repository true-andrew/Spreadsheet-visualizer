import {EventEmitter} from "./EventEmitter.js";

export class BaseComponent extends EventEmitter {
  constructor(mountPoint) {
    super();
    this.mountPoint = mountPoint;
  }

  container = undefined;
  mountPoint = undefined;

  init() {
    if (!this.mountPoint instanceof HTMLElement) {
      throw new Error(`Неверная точка монтирования: ${this.mountPoint}`);
    }
    this.initContainer();
    this.initEventListeners();
    this.render();
  }

  initContainer() {}

  initEventListeners() {}

  render() {
    this.mountPoint.append(this.container);
  }
}