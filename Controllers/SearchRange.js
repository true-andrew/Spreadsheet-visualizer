import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";

export class SearchRange extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
      tableComponent: options.tableComponent
    });
  }

  handleEvent(e) {
    this.tableComponent.searchDateRange(e.detail);
  }

  createDomElements() {
    this.domComponent = createDOMElement('div', undefined, 'controller');
    const datePickerRange = new DatePickerRange({mountPoint: this.domComponent});
    datePickerRange.domComponent.style.width = 'inherit';
    datePickerRange.domComponent.style.marginRight = '10px';
    datePickerRange.domComponent.addEventListener('selectRange', this);
  }
}