import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Search extends BaseComponent {
  constructor(mountPoint, tableApp) {
    super({
      mountPoint,
      tableApp
    });
  }

  handleEvent(e) {
    if (e.type === 'change') {
      this.filterData(e.target.value);
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  initContainer() {
    const container = createDOMElement('div');
    const label = createDOMElement('label', 'Search Field:');
    const inputElement = createDOMElement('input');
    inputElement.addEventListener('change', this);
    container.append(label, inputElement);
    this.container = container;
  }

  filterData(searchValue) {
    console.log('search in table');
    if (searchValue === '') {
      this.emit('renderNewData', this.tableApp.data);
      return;
    }
    const filteredData = [];
    filteredData.push(this.tableApp.data[0]);

    for (let i = 1, len = this.tableApp.data.length; i < len; i++) {
      const row = this.tableApp.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const field = String(row[j].value);
        if (field.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!filteredData.includes(row)) {
            filteredData.push(row);
          }
        }
      }
    }

    this.emit('renderNewData', filteredData);
  }
}