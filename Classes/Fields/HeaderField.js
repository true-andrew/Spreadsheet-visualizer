import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../../helper.js";

export class HeaderField extends BaseComponent {
  constructor(mountPoint, field) {
    super({
      mountPoint,
      value: field.value,
      idCol: field.idCol
    });
  }

  static eventName = 'sortData';

  handleEvent(e) {
    if (e.type === 'click') {
      this.emit('sortData', this.idCol);
    }
  }

  initContainer() {
    this.container = createDOMElement('th', this.value);
  }

  initEventListeners() {
    this.container.addEventListener('click', this);
  }
}