import {BaseComponent} from "../BaseComponent.js";
import {TableController} from "./TableController.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {Search} from "../Controllers/Search.js";
import {Sort} from "../Controllers/Sort.js";

export class Table extends BaseComponent {
  constructor(id, data) {
    super({
      mountPoint: document.getElementById(id),
      data,
    });
  }

  handleEvent(e, data) {
    if (e === 'saveChanges') {
      this.tableController.saveChanges(data);
    } else if (e === 'sortData') {
      this.tableController['tableController_Sort'].sortData(data);
    } else if (e === 'renderNewData') {
      this.tableVisualisator.generateCells(data);
    } else if (e === 'editField') {
      data.edit();
    } else {
      throw new Error(`Unhandled Event: ${e}`);
    }
  }

  init() {
    this.tableController = new TableController(this.mountPoint, this, [Search, Sort]);
    this.tableVisualisator = new TableVisualisator(this.mountPoint, this);
    // this.tableFooter = null
    this.initEventListeners()
  }

  initEventListeners() {
    this.tableController.on('renderNewData', this);
    this.tableVisualisator.on('saveChanges', this);
  }
}