import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Search extends BaseComponent {
  constructor(mountPoint, data) {
    super(mountPoint);
    this.data = data;
    this.init();
  }

  searchInputValue = '';

  handleEvent(e) {
    if (e.type === 'keypress') {
      this.handleKeyPress(e);
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
      this.filterData(e.target.value);
    }
  }

  updateData(data) {
    this.data = data;
    return this;
  }

  initContainer() {
    this.container = createDOMElement('div');
    this.initSearchField();
  }

  initSearchField() {
    const inputElement = createDOMElement('input');
    inputElement.placeholder = 'Search';
    inputElement.addEventListener('keypress', this);
    this.selectColumnElement = this.createSelector();
    this.container.replaceChildren(inputElement, this.selectColumnElement);
  }

  createSelector() {
   const selector = createDOMElement('select');
    const initSelectValue = createDOMElement('option', 'All columns');
    initSelectValue.value = 'all';
    selector.append(initSelectValue);
    for (let i = 0, len = this.data[0].length; i < len; i++) {
      const option = createDOMElement('option', this.data[0][i].value);
      option.value = i;
      selector.append(option);
    }
    return selector;
  }

  filterData(searchValue) {
    console.log('search in table');
    const filteredData = [];

    //add headers to result
    filteredData.push(this.data[0]);

    if(this.selectColumnElement.value === 'all') {
      this.checkAllColumns(filteredData, searchValue);
    } else {
      this.checkColumn(filteredData, searchValue, this.selectColumnElement.value);
    }

    this.emit('renderNewData', filteredData);
  }

  //TODO попробовать упростить
  checkAllColumns(filteredData, searchValue) {
    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        this.appendToFiltered(filteredData, row, j, searchValue);
      }
    }
  }

  checkColumn(filteredData, searchValue, columnNumber) {
    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      this.appendToFiltered(filteredData, row, columnNumber, searchValue);
    }
  }

  appendToFiltered(filteredData, row, columnNumber, searchValue) {
    const fieldValue = String(row[columnNumber].value);
    if (fieldValue.toLowerCase().includes(searchValue.toLowerCase())) {
      if (!filteredData.includes(row)) {
        filteredData.push(row);
      }
    }
  }
}