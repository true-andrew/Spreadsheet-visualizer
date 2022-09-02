import {BaseComponent} from "./BaseComponent.js";
import {TableController} from "./TableController.js";
import {TableVisualisator} from "./TableVisualisator.js";
import {Search} from "./Search.js";
import {Sort} from "./Sort.js";
import {contextMenu} from "./ContextMenu.js";

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
    } else if (e === 'renderNewData') {
      this.tableVisualisator.generateCells(data);
    } else if (e === 'editField') {
      data.edit();
    }
  }

  init() {
    this.tableController = new TableController(this.mountPoint, this, [Search, Sort]);
    this.tableVisualisator = new TableVisualisator(this.mountPoint, this);
    this.tableController.on('renderNewData', this);
    this.tableVisualisator.on('saveChanges', this);
    contextMenu.on('editField', this);
    // this.tableFooter = null
  }
}