import {Search} from "./Search.js";
import {Sort} from "./Sort.js";
import {Field} from "./Field.js";
import {EventEmitter} from "./EventEmitter.js";
import {ContextMenu} from "./ContextMenu.js";
import {createDOMElement} from "../helper.js";

const tableParameters = [Search, Sort];

export class TableController extends EventEmitter {
  container = undefined;
  table = undefined;
  contextMenu = undefined;
  editingCell = undefined;

  constructor(id, data) {
    super();
    this.data = data;
    this.initContainer(id);
    this.generateCells(data);
    this.on('search', this);
    this.on('sortTable', this);
  }

  handleEvent(e, data) {
    if (e === 'search') {
      this.filterData(data);
    } else if (e === 'callContextMenu') {
      if (this.editingCell !== undefined) {
        return;
      }
      this.contextMenu.openContextMenu(data);
    } else if (e === 'editField') {
      // this.editingCell = data;
      // this.editingCell.edit();
    } else if (e === 'optionChanged') {
      // this.editingCell.saveChanges(data);
      // this.editingCell = undefined;
    } else if (e === 'sortTable') {
      this.sortData();
    } else {
      throw new Error(`Unhandled event: ${e}`);
    }
  }

  sortData() {
    const sorted = [];

    for (let i = 0, len = this.data.length; i < len; i++) {
      const row = this.data[i];

    }
  }

  filterData(searchValue) {
    this.table.textContent = '';
    if (searchValue === '') {
      this.generateCells(this.data);
      return;
    }

    const filteredData = [];
    for (let i = 0, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const field = String(row[j].value);
        if (field.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!filteredData.includes(row)) {
            filteredData.push(row);
          }
        }
      }
    }

    this.generateCells(filteredData);
  }

  initContainer(id) {
    this.container = document.getElementById(id);
    this.table = createDOMElement('table', '', 'table');

    //Создать настройки таблицы
    for (let i = 0, len = tableParameters.length; i < len; i++) {
      const option = new tableParameters[i];
      this.container.append(option.container);
    }

    this.container.append(this.table);
  }

  generateCells(data) {
    this.contextMenu = new ContextMenu();
    this.contextMenu.on('callContextMenu', this);
    this.table.append(this.contextMenu.container);

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];
      for (let j = 0, len = fields.length; j < len; j++) {
        const dataObject = fields[j];
        const field = new Field(dataObject);
        row.append(field.container);
      }
      this.table.append(row);
    }
  }
}