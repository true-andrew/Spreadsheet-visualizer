import {DatePicker, formatDate} from "./DatePicker.js";
import {createDOMElement} from "../../helper.js";

export class DatePickerRange extends DatePicker {
  constructor(mountPoint) {
    super(mountPoint);
  }

  startDate;
  endDate;

  init() {
    super.init();
    this.mountPoint.classList.add('date-picker');
    this.inputElement.placeholder = 'DD.MM.YYYY - DD.MM.YYYY';
    this.mountPoint.style.width = '100%';
    this.inputElement.style.textAlign = 'center';
    const resetBtn = createDOMElement('button', 'Reset', undefined, {
      action: 'resetRange',
    });
    resetBtn.addEventListener('click', this);
    this.container.append(resetBtn)
  }

  hide() {
    super.hide();
    this.inputElement.blur();
    this.startDate = undefined;
    this.endDate = undefined;
    this.selectedDate = undefined;
    this.renderDays(this.displayedDate.getFullYear(), this.displayedDate.getMonth());
  }

  resetRange(e) {
    if (this.inputElement.value.length) {
      this.emit('selectRange');
    }
    this.inputElement.value = '';
    this.hide();
  }

  setInputFieldValue(date) {
    if (this.startDate === undefined) {
      this.inputElement.value = formatDate(date);
    } else {
      this.inputElement.value += '   -   ' + formatDate(date);
    }
  }

  pickDate(el) {
    super.pickDate(el);
    if (this.startDate === undefined) {
      this.setStartDate();
    } else {
      this.setEndDate();
    }
  }

  setStartDate() {
    this.startDate = this.selectedDate;
  }

  setEndDate() {
    this.endDate = this.selectedDate;

    if (this.endDate < this.startDate) {
      const tmp = this.endDate;
      this.endDate = this.startDate;
      this.startDate = tmp;
      this.reverseRange();
    }

    this.emit('selectRange', {
      start: this.startDate.valueOf(),
      end: this.endDate.valueOf(),
    });

    this.hide();
  }

  reverseRange() {
    this.inputElement.value = this.inputElement.value.split('   -   ').reverse().join('   -   ');
  }
}