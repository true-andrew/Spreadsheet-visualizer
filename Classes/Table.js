import {TableController} from "./TableController.js";
import {Search} from "./Search.js";
import {Sort} from "./Sort.js";

export class Table {
  constructor(id, data) {
    this.container = document.getElementById(id);
    this.data = data;
    new TableController(this.container, this.data, [Search, Sort]);
  }
}