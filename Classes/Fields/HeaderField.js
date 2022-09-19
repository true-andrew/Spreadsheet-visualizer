import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../../helper.js";

export class HeaderField extends BaseComponent {
  constructor(mountPoint, field, tableComponent) {
    super(mountPoint);
    this.tableComponent = tableComponent;
    this.value = field.value;
    this.idCol = field.idCol;
    this.init();
  }

  handleEvent(e) {
    if (e.type === 'click') {
      this.tableComponent.sortData(this.idCol);
    }
  }

  initContainer() {
    this.container = createDOMElement('th', this.value);
  }

  initEventListeners() {
    this.container.addEventListener('click', this);
  }
}