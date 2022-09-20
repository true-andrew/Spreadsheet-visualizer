import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";

export class HeaderField extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
      value: options.field.value,
      idCol: options.field.idCol,
      tableComponent: options.tableComponent
    });
  }

  handleEvent(e) {
    if (e.type === 'click') {
      this.tableComponent.sortData(this.idCol);
    }
  }

  createDomElements() {
    this.domComponent = createDOMElement('th', this.value);
  }

  initEvents() {
    this.domComponent.addEventListener('click', this);
  }
}