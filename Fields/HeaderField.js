import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";

export class HeaderField extends BaseComponent {
  handleEvent(e) {
    if (e.type === 'click') {
      this.tableComponent.sortData(this.field.idCol);
    }
  }

  renderComponent() {
    this.domComponent = createDOMElement('th', this.field.value);
  }

  initEvents() {
    this.domComponent.addEventListener('click', this);
  }
}