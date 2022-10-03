import {createDOMElement} from "../helper.js";
import {BaseComponent} from "../BaseComponent.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";
import {Search} from "../Search/Search.js";

export class SearchBar extends BaseComponent {
  handleEvent(e) {
    if (e.type === 'selectRange') {
      this.tableComponent.searchDateRange(e.detail);
    } else if (e.type === 'search') {
      this.tableComponent.searchData({
        searchValue: e.detail,
        colNumber: JSON.parse(this.selectColumnElement.value)
      })
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  init() {
    this.searchField = new Search({});
    this.searchField.init();
  }

  renderComponent() {
    this.domComponent = createDOMElement('div', undefined, 'controller');
    this.searchField.renderComponent();

    const searchContainer = createDOMElement('div', undefined, 'search-container');
    this.selectColumnElement = this.createSelector();
    searchContainer.append(this.searchField.domComponent, this.selectColumnElement);

    const datePickerRange = new DatePickerRange({tableComponent: this.tableComponent});
    datePickerRange.init();
    datePickerRange.mountPoint = this.domComponent;
    datePickerRange.renderComponent();
    datePickerRange.domComponent.addEventListener('selectRange', this);
    datePickerRange.mountComponent();

    this.domComponent.append(searchContainer, datePickerRange.domComponent);
  }

  initEvents() {
    this.searchField.domComponent.addEventListener('search', this);
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