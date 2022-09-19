import {DatePicker, formatDate} from "./DatePicker.js";
import {createDOMElement} from "../helper.js";

export class DatePickerRange extends DatePicker {
  constructor(options) {
    super({mountPoint: options.mountPoint});
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
    this.domComponent.append(resetBtn)
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
      this.domComponent.dispatchEvent(new CustomEvent('selectRange'));
    }
    this.inputElement.value = '';
    this.hide();
  }

  setInputFieldValue(date) {
    if (this.startDate === undefined && date !== undefined) {
      this.inputElement.value = formatDate(date);
    } else if (this.endDate === undefined && date !== undefined) {
      this.inputElement.value = formatDate(this.startDate) + '   -   ' + formatDate(date);
    } else {
      this.inputElement.value = '';
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

  handleEvent_input(ev) {
    //add manual input
    this.setInputFieldValue();
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

    this.domComponent.dispatchEvent(new CustomEvent('selectRange', {
      detail: {
        start: this.startDate.valueOf(),
        end: this.endDate.valueOf(),
      }
    }));

    this.hide();
  }

  reverseRange() {
    this.inputElement.value = this.inputElement.value.split('   -   ').reverse().join('   -   ');
  }
}