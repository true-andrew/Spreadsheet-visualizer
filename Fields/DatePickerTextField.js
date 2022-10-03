import {DatePicker} from "../Datepicker/DatePicker.js";

export class DatePickerTextField extends DatePicker {
  renderComponent() {
    super.renderComponent();
    this.domComponent.classList.add('date-picker');
    this.setInitDate(this.field.value);
    this.show();
  }

  mountComponent() {
    super.mountComponent();
    this.inputElement.focus();
  }

  hide() {
    super.hide();
    // this.domComponent.classList.remove('date-picker');
    this.domComponent.dispatchEvent(new CustomEvent('endEdit', {detail: this.inputElement.value}));
  }

  setInitDate(inputDate) {
    const date = inputDate.split('.').reverse().join('-');
    this.setDate(date);
  }
}