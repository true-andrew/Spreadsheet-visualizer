import {BaseComponent} from "../BaseComponent.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {createDOMElement, insertSort} from "../../helper.js";
import {Search} from "../Controllers/Search.js";
import {DataSelector} from "../Controllers/DataSelector.js";

export class TableComponent extends BaseComponent {
  constructor(id, data, dataArr) {
    super(document.getElementById(id));
    this.datasets = dataArr;
    this.data = data;
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
    } else {
      throw new Error(`Unhandled Event: ${e}`);
    }
  }

  initContainer() {
    this.container = createDOMElement('div', undefined, 'controllers');
  }

  init() {
    super.init();
    this.tableVisualisator = new TableVisualisator(this.mountPoint, this);
    this.dataSelectorComponent = new DataSelector(this.container, this.datasets);
    this.dataSelectorComponent.on('selectNewData', this);
    this.initSearch();
  }

  initSearch() {
    this.searchComponent = new Search(this.container, this.data);
    this.searchComponent.on('renderNewData', this);
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
    this.searchComponent.updateData(data).initSearchField();
    this.renderData(data);
  }
}