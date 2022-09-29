import {createDOMElement} from "../helper.js";
import {BaseComponent} from "../BaseComponent.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";

export class Search extends BaseComponent {
  searchInputValue = '';

  handleEvent(e) {
    if (e.type === 'keypress') {
      this.handleKeyPress(e);
    } else if (e.type === 'selectRange') {
      this.tableComponent.searchDateRange(e.detail);
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  handleKeyPress(e) {
    if (this.searchInputValue === e.target.value) {
      return;
    }
    if (e.key === 'Enter') {
      this.searchInputValue = e.target.value;
      this.tableComponent.searchData(this.searchInputValue, JSON.parse(this.selectColumnElement.value));
    }
  }

  createDomElements() {
    this.domComponent = createDOMElement('div', undefined, 'controller');
    this.domComponent.append(this.initSearchField(), this.initSearchRange());
  }

  initSearchField() {
    const searchContainer = createDOMElement('div', undefined, 'search-container');
    const inputElement = createDOMElement('input');
    inputElement.placeholder = 'Search';
    inputElement.addEventListener('keypress', this);
    this.selectColumnElement = this.createSelector();
    searchContainer.append(inputElement, this.selectColumnElement);
    return searchContainer;
  }

  initSearchRange() {
    const datePickerRange = new DatePickerRange({tableComponent: this.tableComponent});
    datePickerRange.init();
    datePickerRange.mountPoint = this.domComponent;
    datePickerRange.renderComponent();
    datePickerRange.domComponent.addEventListener('selectRange', this);
    datePickerRange.mountComponent();
    return datePickerRange.domComponent;
  }

  createSelector() {
    const selector = createDOMElement('select');

    const initSelectValue = createDOMElement('option', 'All columns');
    initSelectValue.value = null;
    selector.append(initSelectValue);

    const data = this.tableComponent.dataModel.getValues();
    for (let i = 0, len = data[0].length; i < len; i++) {
      const option = createDOMElement('option', data[0][i].value);
      option.value = i;
      selector.append(option);
    }
    return selector;
  }
}