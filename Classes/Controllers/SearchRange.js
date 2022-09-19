import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../../helper.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";

export class SearchRange extends BaseComponent {
  constructor(mountPoint, tableComponent) {
    super(mountPoint);
    this.tableComponent = tableComponent;
    this.init();
  }

  handleEvent(e) {
    this.tableComponent.searchDateRange(e.detail);
  }

  initContainer() {
    this.container = createDOMElement('div', undefined, 'controller');
    const datepickerContainer = createDOMElement('div');
    const datePickerRange = new DatePickerRange(datepickerContainer);
    datePickerRange.container.addEventListener('selectRange', this);
    this.container.append(datepickerContainer);
  }

}