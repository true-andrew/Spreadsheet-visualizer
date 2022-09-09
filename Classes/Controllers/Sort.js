import {createDOMElement, insertSort} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Sort extends BaseComponent {
  constructor(mountPoint, tableApp) {
    super(mountPoint);
    this.init();
    this.tableApp = tableApp;
  }

  tableApp;
  sortOrder = true;
  reset = false;

  handleEvent(e) {
    if (e.type === 'click') {
      this.handleResetSort(e);
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  handleResetSort(e) {
    if (this.reset === true) {
      return;
    }
    this.reset = true;
    this.sortOrder = true;
    this.emit('renderNewData', this.tableApp.data);
  }

  initContainer() {
    this.container = createDOMElement('div');
    const sortButton = createDOMElement('button', 'Reset sort');
    sortButton.addEventListener('click', this);
    this.container.append(sortButton);
  }

  sortData(colNumber) {
    console.log('sort table');
    this.reset = false;
    this.sortOrder = !this.sortOrder;
    const sortData = [].concat(this.tableApp.data);
    insertSort(sortData, this.sortOrder, colNumber);
    this.emit('renderNewData', sortData);
  }
}