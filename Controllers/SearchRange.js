import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";

export class SearchRange extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
      tableComponent: options.tableComponent
    });
    // this.tableComponent = tableComponent;
    // this.init();
  }

  handleEvent(e) {
    this.tableComponent.searchDateRange(e.detail);
  }

  createDomElements() {
    this.domComponent = createDOMElement('div', undefined, 'controller');
    const datepickerContainer = createDOMElement('div');
    const datePickerRange = new DatePickerRange({mountPoint: datepickerContainer});
    datePickerRange.domComponent.addEventListener('selectRange', this);
    this.domComponent.append(datepickerContainer);
  }
}