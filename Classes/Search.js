import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";

export class Search extends EventEmitter {
  constructor() {
    super();
    this.initSearchField();
  }

  static eventName = 'searchTable'

  handleEvent(e) {
    if (e.type === 'change') {
      this.emit('searchTable', e.target.value);
    }
  }

  initSearchField() {
    const container = createDOMElement('div');
    const label = createDOMElement('label', 'Search Field:');
    const inputElement = createDOMElement('input');
    inputElement.addEventListener('change', this);
    container.append(label, inputElement);
    this.container = container;
  }

  render(container) {
    container.append(this.container);
  }
}