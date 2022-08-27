import {Search} from "./Search.js";
import {Sort} from "./Sort.js";
import {EventEmitter} from "./EventEmitter.js";

const tableParameters = [Search, Sort];

export class TableController extends EventEmitter {
  container = undefined;
  table = undefined;
  contextMenu = undefined;
  editingCell = undefined;

  constructor(id, data) {
    super();
    this.data = data;
    // this.generateCells(data);
    this.on('search', this);
    this.on('sortTable', this);
  }

  handleEvent(e, data) {
    if (e === 'search') {
      this.filterData(data);
    }  else if (e === 'editField') {
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

  // filterData(searchValue) {
  //   this.table.textContent = '';
  //   if (searchValue === '') {
  //     this.generateCells(this.data);
  //     return;
  //   }
  //
  //   const filteredData = [];
  //   for (let i = 0, len = this.data.length; i < len; i++) {
  //     const row = this.data[i];
  //     for (let j = 0, len = row.length; j < len; j++) {
  //       const field = String(row[j].value);
  //       if (field.toLowerCase().includes(searchValue.toLowerCase())) {
  //         if (!filteredData.includes(row)) {
  //           filteredData.push(row);
  //         }
  //       }
  //     }
  //   }
  //
  //   // this.generateCells(filteredData);
  // }
}