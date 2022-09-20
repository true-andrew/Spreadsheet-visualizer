import {createDOMElement} from "../helper.js";
import {getData} from "../data.js";
import {BaseComponent} from "../BaseComponent.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {Search} from "../Controllers/Search.js";
import {DataSelector} from "../Controllers/DataSelector.js";
import {TableDataModel} from "./TableDataModel.js";
import {SearchRange} from "../Controllers/SearchRange.js";

export class TableComponent extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
    });
  }

  init() {
    this.loader = createDOMElement('div', undefined, 'loader');
    this.mountPoint.append(this.loader);
    getData().then(res => {
      this.loader.remove();
      this.datasets = res;
      this.dataSelectorComponent = new DataSelector({tableComponent: this});
      this.createDomElements();
      this.render();
    });
  }

  createDomElements() {
    this.domComponent = createDOMElement('div');
    this.controllersContainer = createDOMElement('div', undefined, 'controllers');
    this.searchComponent = new Search({mountPoint: this.controllersContainer, tableComponent: this});
    this.searchRangeComponent = new SearchRange({mountPoint: this.controllersContainer, tableComponent: this});
    this.tableVisualisator = new TableVisualisator({tableComponent: this});
    this.tableVisualisator.generateCells(this.data);
  }

  render() {
    this.domComponent.replaceChildren(this.controllersContainer, this.tableVisualisator.domComponent);
    this.mountPoint.append(this.domComponent);
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
    this.dataModel = new TableDataModel(this.datasets[dataName]);
    this.data = this.dataModel.getValues();
    this.domComponent.remove();
    this.createDomElements();
    this.render();
  }
}