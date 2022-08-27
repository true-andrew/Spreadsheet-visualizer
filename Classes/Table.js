import {EventEmitter} from "./EventEmitter.js";
import {TableController} from "./TableController.js";
import {TableWrapper} from "../TableWrapper.js";

export class Table extends EventEmitter {
  // components = [];

  constructor(id, data) {
    super();
    this.container = document.getElementById(id);
    this.data = data;
    // this.tableController = new TableController(data);
    this.tableWrapper = new TableWrapper();
    this.render();
  }

  render() {
    // this.tableController.render(this.container);
    this.tableWrapper.render(this.container, this.data);
  }
}