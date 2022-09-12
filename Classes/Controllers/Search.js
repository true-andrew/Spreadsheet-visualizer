import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Search extends BaseComponent {
  constructor(mountPoint, tableApp) {
    super(mountPoint);
    this.tableApp = tableApp;
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
    //Проверка на инпут
    if (this.searchInputValue === e.target.value) {
      return;
    }
    if (e.key === 'Enter') {
      this.searchInputValue = e.target.value;
      this.filterData(e.target.value);
    }
  }

  initContainer() {
    const container = createDOMElement('div');
    const inputElement = createDOMElement('input');
    inputElement.placeholder = 'Search';
    const selectElement = this.createSelector();
    inputElement.addEventListener('keypress', this);
    container.append(inputElement, selectElement);
    this.container = container;
  }

  createSelector() {
    this.selectColumnElement = createDOMElement('select');
    const initSelectValue = createDOMElement('option', 'All columns');
    initSelectValue.value = 'all';
    this.selectColumnElement.append(initSelectValue);
    for (let i = 0, len = this.tableApp.data[0].length; i < len; i++) {
      const option = createDOMElement('option', this.tableApp.data[0][i].value);
      option.value = i;
      this.selectColumnElement.append(option);
    }

    return this.selectColumnElement;
  }

  filterData(searchValue) {
    console.log('search in table');
    const filteredData = [];
    filteredData.push(this.tableApp.data[0]);

    if(this.selectColumnElement.value === 'all') {
      this.checkAllColumns(filteredData, searchValue);
    } else {
      this.checkColumn(filteredData, searchValue, this.selectColumnElement.value);
    }

    this.tableApp.handleEvent('renderNewData', filteredData);
    // this.emit('renderNewData', filteredData);
  }

  checkAllColumns(filteredData, searchValue) {
    for (let i = 1, len = this.tableApp.data.length; i < len; i++) {
      const row = this.tableApp.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        appendToFiltered(filteredData, row, j, searchValue);
      }
    }
  }

  checkColumn(filteredData, searchValue, columnNumber) {
    for (let i = 1, len = this.tableApp.data.length; i < len; i++) {
      const row = this.tableApp.data[i];
      appendToFiltered(filteredData, row, columnNumber, searchValue);
    }
  }
}

function appendToFiltered(filteredData, row, columnNumber, searchValue) {
  const fieldValue = String(row[columnNumber].value);
  if (fieldValue.toLowerCase().includes(searchValue.toLowerCase())) {
    if (!filteredData.includes(row)) {
      filteredData.push(row);
    }
  }
}