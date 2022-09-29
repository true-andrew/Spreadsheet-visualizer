import {DatePicker} from "./DatePicker.js";

export class DatePickerTextField extends DatePicker {
  renderComponent() {
    super.renderComponent();
    this.domComponent.classList.add('date-picker');
    this.setInitDate(this.field.value);
    this.show();
  }

  hide() {
    super.hide();
    this.domComponent.classList.remove('date-picker');
    this.domComponent.dispatchEvent(new CustomEvent('endEdit', {detail: this.inputElement.value}));
  }

  setInitDate(inputDate) {
    const date = inputDate.split('.').reverse().join('-');
    this.setDate(date);
  }
}