import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";

export class Sort extends EventEmitter {
  constructor() {
    super();
    this.initContainer();
  }

  container = undefined;

  handleEvent(e) {
    if (e.type === 'click') {
      super.emit('sortTable', undefined);
    }
  }

  initContainer() {
    const sortButton = createDOMElement('button', 'Sort Table');
    sortButton.addEventListener('click', this);
    this.container = sortButton;
  }

}