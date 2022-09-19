import {EventEmitter} from "./EventEmitter.js";

export class BaseComponent extends EventEmitter {
  constructor(options) {
    super()
    this.childMountPoints = []
    this.registerOptions(options);
    this.init();
  }
  domComponent = undefined;
  registerOptions(options) {
    for (let i = 0; i < Object.keys(options).length; i++) {
      const optionName = Object.keys(options)[i];
      this[optionName] = options[optionName]
    }
  }
  init() {
    if (!this.mountPoint instanceof HTMLElement) {
      throw new Error("Неверная точка монтирования:", this.mountPoint);
    }
    this.createDomElements();
    this.initEvents();
    this.render();
  }
  createDomElements() {}
  initEvents() {}
  render() {
    this.mountPoint.append(this.domComponent);
  }
}