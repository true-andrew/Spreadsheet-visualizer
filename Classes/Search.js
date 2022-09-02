import {createDOMElement} from "../helper.js";
import {BaseComponent} from "./BaseComponent.js";

export class Search extends BaseComponent {
  constructor(mountPoint) {
    super({
      mountPoint
    });
  }

  static eventName = 'searchTable'

  handleEvent(e) {
    if (e.type === 'change') {
      this.emit('searchTable', e.target.value);
    }
  }

  initContainer() {
    const container = createDOMElement('div');
    const label = createDOMElement('label', 'Search Field:');
    const inputElement = createDOMElement('input');
    inputElement.addEventListener('change', this);
    container.append(label, inputElement);
    this.container = container;
  }
}