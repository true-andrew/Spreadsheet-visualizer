import {createDOMElement, insertSort} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Sort extends BaseComponent {
  constructor(mountPoint, tableApp) {
    super({
      mountPoint,
      tableApp
    });
  }

  sortOrder = true;

  handleEvent(e) {
    if (e.type === 'click') {
      this.sortOrder = true;
      this.emit('renderNewData', this.tableApp.data);
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  initContainer() {
    const sortButton = createDOMElement('button', 'Reset sort');
    sortButton.addEventListener('click', this);
    this.container = sortButton;
  }

  sortData(colNumber) {
    console.log('sort table');
    this.sortOrder = !this.sortOrder;
    const sortData = [].concat(this.tableApp.data);
    insertSort(sortData, this.sortOrder, colNumber);
    this.emit('renderNewData', sortData);
  }
}