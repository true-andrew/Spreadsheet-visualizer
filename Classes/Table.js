import {EventEmitter} from "./EventEmitter.js";
import {TableController} from "./TableController.js";
import {TableWrapper} from "../TableWrapper.js";

export class Table extends EventEmitter {
  constructor(id, data) {
    super();
    this.container = document.getElementById(id);
    this.data = data;
    this.tableController = new TableController(this.container, this.data);
  }
}