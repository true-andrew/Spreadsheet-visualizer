import {BaseComponent} from "../BaseComponent.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {createDOMElement, dateToNumber, insertSort} from "../../helper.js";
import {Search} from "../Controllers/Search.js";
import {DataSelector} from "../Controllers/DataSelector.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";

export class TableComponent extends BaseComponent {
  constructor(id, dataArr) {
    super(document.getElementById(id));
    this.datasets = dataArr;
    // this.data = dataArr['documents'];
    this.initDataSelector();
    this.init();
  }

  datasets;
  data;
  tableVisualisator;
  dataSelectorComponent
  sortOrder = false;
  searchComponent;

  handleEvent(e, data) {
    if (e === 'saveChanges') {
      this.saveChanges(data);
    } else if (e === 'sortData') {
      this.sortData(data);
    } else if (e === 'renderNewData') {
      this.renderData(data);
    } else if (e === 'selectNewData') {
      this.changeDataSource(data);
    } else if (e === 'selectRange') {
      this.filterDateRange(data);
    } else {
      throw new Error(`Unhandled Event: ${e}`);
    }
  }

  initContainer() {
    this.container = createDOMElement('div');
  }

  init() {
    super.init();
    // this.initControllers();
    this.initTableVisualisator();
  }

  initControllers() {
    this.controllersContainer = createDOMElement('div', undefined, 'controllers');
    this.initSearch();
    this.initSearchRange();
    this.container.replaceChildren(this.controllersContainer);
  }

  initTableVisualisator() {
    this.tableVisualisator = new TableVisualisator(this.mountPoint, this);
  }

  initDataSelector() {
    this.dataSelectorComponent = new DataSelector(this.mountPoint, this.datasets);
    this.dataSelectorComponent.on('selectNewData', this);
  }

  initSearch() {
    this.searchComponent = new Search(this.controllersContainer, this.data);
    this.searchComponent.on('renderNewData', this);
  }

  initSearchRange() {
    const controllerContainer = createDOMElement('div', undefined, 'controller');
    const datepickerContainer = createDOMElement('div');
    const datePickerRange = new DatePickerRange(datepickerContainer);
    datePickerRange.on('selectRange', this);
    controllerContainer.append(datepickerContainer);
    this.controllersContainer.append(controllerContainer);
  }

  sortData(colNumber) {
    console.log('sort table');
    this.sortOrder = !this.sortOrder;
    const sortData = [].concat(this.data);
    insertSort(sortData, this.sortOrder, colNumber);
    this.renderData(sortData);
  }

  saveChanges(data) {
    console.log('saving changes');
    this.data[data.idRow][data.idCol].value = data.newValue;
  }

  renderData(data) {
    this.tableVisualisator.generateCells(data);
  }

  changeDataSource(data) {
    this.data = data;
    this.initControllers();
    this.renderData(data);

  }

  filterDateRange(data) {
    if (data === undefined) {
      this.renderData(this.data);
      return;
    }
    const filtered = [];

    filtered.push(this.data[0]);

    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const col = row[j];
        if (col.type === 'date' && dateToNumber(col.value) >= data.start && dateToNumber(col.value) <= data.end) {
          filtered.push(row);
        }
      }
    }

    this.renderData(filtered);
  }
}