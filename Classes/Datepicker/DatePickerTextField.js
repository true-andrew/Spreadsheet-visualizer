import {DatePicker} from "./DatePicker.js";

export class DatePickerTextField extends DatePicker {
  constructor(mountPoint, inputDate) {
    super(mountPoint);
    mountPoint.classList.add('date-picker');
    // this.datePicker = new DatePicker(mountPoint);
    // this.datePicker.on('closeDatePicker', this);
    // this.datePicker.show();
    this.show();
    this.setInitDate(inputDate);

  }

  hide() {
    super.hide();
    this.mountPoint.classList.remove('date-picker');
    this.emit('endEdit', this.inputElement.value);
  }

  setInitDate(inputDate) {
    const date = inputDate.split('.').reverse().join('-');
    this.setDate(date);
  }
}