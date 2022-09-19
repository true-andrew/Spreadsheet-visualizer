import {BaseComponent} from "../BaseComponent.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {createDOMElement, dateToNumber, insertSort} from "../../helper.js";
import {Search} from "../Controllers/Search.js";
import {DataSelector} from "../Controllers/DataSelector.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";
import {DataModel} from "../DataModel.js";
import {SearchRange} from "../Controllers/SearchRange.js";

export class TableComponent {
  constructor(mountPoint, getData) {
    this.init(mountPoint, getData);
  }

  datasets;
  data;
  tableVisualisator;
  dataSelectorComponent
  searchComponent;
  searchRangeComponent;
  mountPoint
  loader;

  init(mountPoint, getData) {
    this.mountPoint = mountPoint;
    this.loader = createDOMElement('div', undefined, 'loader');
    this.mountPoint.append(this.loader);
    getData().then(res => {
      this.loader.remove();
      this.datasets = res;
      this.dataSelectorComponent = new DataSelector(this);
      this.initContainer();
      this.render();
    });
  }

  initContainer() {
    this.container = createDOMElement('div');
    this.controllersContainer = createDOMElement('div', undefined, 'controllers');
    this.container.append(this.controllersContainer);
    this.searchComponent = new Search(this.controllersContainer, this);
    this.searchRangeComponent = new SearchRange(this.controllersContainer, this);
    this.tableVisualisator = new TableVisualisator(this.container, this);
    this.tableVisualisator.generateCells(this.data);
  }

  render() {
    this.container.replaceChildren(this.controllersContainer, this.tableVisualisator.container);
    this.mountPoint.append(this.container);
  }

  sortData(colNumber) {
    this.dataModel.setFilter('sort', {colNumber});
    this.data = this.dataModel.getValues();
    this.renderData(this.data);
  }

  searchData(searchValue, colNumber) {
    this.data = this.dataModel.setFilter('search', {
      searchValue,
      colNumber
    }).getValues();
    this.renderData(this.data);
  }

  searchDateRange(data) {
    this.data = this.dataModel.setFilter('searchDateRange', data).getValues();
    this.renderData(this.data);
  }

  saveChanges(data) {
    console.log('saving changes');
    this.data = this.dataModel.saveChanges(data).getValues();
    this.renderData(this.data);
  }

  renderData(data) {
    this.tableVisualisator.generateCells(data);
  }

  changeDataSource(dataName) {
    this.dataModel = new DataModel(this.datasets[dataName]);
    this.data = this.dataModel.getValues();
    this.container.remove();
    this.initContainer();
    this.render();
  }
}