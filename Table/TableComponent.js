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
    this.mountPoint.classList.add('table_component');
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
    this.renderData();
  }

  render() {
    this.domComponent.replaceChildren(this.controllersContainer, this.tableVisualisator.domComponent);
    this.mountPoint.append(this.domComponent);
  }

  sortData(colNumber) {
    this.dataModel.setFilter('sort', {colNumber});
    this.renderData();
  }

  searchData(searchValue, colNumber) {
    this.dataModel.setFilter('search', {
      searchValue,
      colNumber
    });
    this.renderData();
  }

  searchDateRange(data) {
    this.dataModel.setFilter('searchDateRange', data);
    this.renderData();
  }

  saveChanges(data) {
    this.dataModel.saveChanges(data);
    this.renderData();
  }

  renderData() {
    this.tableVisualisator.generateCells(this.dataModel.getValues());
  }

  changeDataSource(dataName) {
    this.dataModel = new TableDataModel(this.datasets[dataName]);
    this.domComponent.remove();
    this.createDomElements();
    this.render();
  }
}