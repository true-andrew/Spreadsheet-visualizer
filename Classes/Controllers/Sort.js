import {createDOMElement, insertSort} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Sort extends BaseComponent {
  tableApp;
  sortOrder = true;
  constructor(mountPoint, tableApp) {
    super(mountPoint);
    this.init();
    this.tableApp = tableApp;
  }

  handleEvent(e) {
    if (e.type === 'click') {
      this.sortOrder = true;
      this.emit('renderNewData', this.tableApp.data);
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  initContainer() {
    this.container = createDOMElement('div');
    const sortButton = createDOMElement('button', 'Reset sort');
    sortButton.addEventListener('click', this);
    this.container.append(sortButton);
  }

  sortData(colNumber) {
    console.log('sort table');
    this.sortOrder = !this.sortOrder;
    const sortData = [].concat(this.tableApp.data);
    insertSort(sortData, this.sortOrder, colNumber);
    this.emit('renderNewData', sortData);
  }
}