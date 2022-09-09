import {BaseComponent} from "../BaseComponent.js";
import {TableController} from "./TableController.js";
import {TableVisualisator} from "./TableVisualisator.js";

export class Table extends BaseComponent {
  constructor(id, data) {
    super(document.getElementById(id));
    this.data = data;
    this.init();
  }

  data;
  tableController;
  tableVisualisator;

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
    this.tableController = new TableController(this.mountPoint, this);
    this.tableVisualisator = new TableVisualisator(this.mountPoint, this);
    // this.tableFooter = null
    this.initEventListeners()
  }

  initEventListeners() {
    // this.tableController.on('renderNewData', this);
    // this.tableVisualisator.on('saveChanges', this);
  }
}