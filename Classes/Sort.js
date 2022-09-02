import {createDOMElement} from "../helper.js";
import {BaseComponent} from "./BaseComponent.js";

export class Sort extends BaseComponent {
  constructor(mountPoint) {
    super({
      mountPoint
    });
  }

  static eventName = 'sortTable';

  handleEvent(e) {
    if (e.type === 'click') {
      this.emit('sortTable', undefined);
    }
  }

  initContainer() {
    const sortButton = createDOMElement('button', 'Sort Table');
    sortButton.addEventListener('click', this);
    this.container = sortButton;
  }
}