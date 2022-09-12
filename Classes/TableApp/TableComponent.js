import {BaseComponent} from "../BaseComponent.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {insertSort} from "../../helper.js";
import {Search} from "../Controllers/Search.js";

export class TableComponent extends BaseComponent {
  constructor(id, data) {
    super(document.getElementById(id));
    this.data = data;
    this.init();
  }

  data;
  tableVisualisator;
  sortOrder = false;
  searchComponent;

  handleEvent(e, data) {
    if (e === 'saveChanges') {
      this.saveChanges(data);
    } else if (e === 'sortData') {
      this.sortData(data);
    } else if (e === 'renderNewData') {
      this.tableVisualisator.generateCells(data);
    } else if (e === 'editField') {
      data.edit();
    } else {
      throw new Error(`Unhandled Event: ${e}`);
    }
  }

  init() {
    this.initControllers();
    this.tableVisualisator = new TableVisualisator(this.mountPoint, this);
  }

  sortData(colNumber) {
    console.log('sort table');
    this.sortOrder = !this.sortOrder;
    const sortData = [].concat(this.data);
    insertSort(sortData, this.sortOrder, colNumber);
    this.tableVisualisator.generateCells(sortData);
  }

  saveChanges(data) {
    console.log('saving changes');
    this.data[data.idRow][data.idCol].value = data.newValue;
  }

  initControllers() {
    this.searchComponent = new Search(this.mountPoint, this.data);
    this.searchComponent.on('renderNewData', this);
  }
}