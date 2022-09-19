import {DatePicker} from "./DatePicker.js";

export class DatePickerTextField extends DatePicker {
  constructor(options) {
    super({mountPoint: options.field.domComponent});
    this.mountPoint.classList.add('date-picker');
    this.show();
    this.setInitDate(options.field.value);
  }

  hide() {
    super.hide();
    this.mountPoint.classList.remove('date-picker');
    this.domComponent.dispatchEvent(new CustomEvent('endEdit', {detail: this.inputElement.value}));
  }

  setInitDate(inputDate) {
    const date = inputDate.split('.').reverse().join('-');
    this.setDate(date);
  }
}