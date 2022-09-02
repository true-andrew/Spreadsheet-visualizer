import {createDOMElement, insertSort} from "../helper.js";
import {BaseComponent} from "./BaseComponent.js";

export class TableController extends BaseComponent {
  constructor(container, parent, controllers) {
    super({
      mountPoint: container,
      parent
    });
    this.initControllers(controllers);
  }

  sortOrder = true;

  handleEvent(e, data) {
    if (e === 'searchTable') {
      this.filterData(data);
    } else if (e === 'saveChanges') {
      this.saveChanges(data);
    } else if (e === 'sortTable') {
      this.sortData();
    } else {
      throw new Error(`Unhandled event: ${e}`);
    }
  }

  initContainer() {
    this.container = createDOMElement('div', undefined, 'controllers');
  }

  initControllers(controllers) {
    for (let i = 0, len = controllers.length; i < len; i++) {
      const controller = controllers[i];
      const controllerName = 'tableController_' + controllers[i].name;
      this[controllerName] = new controller(this.container);
      this[controllerName].on(controller.eventName, this);
    }
  }

  saveChanges(data) {
    console.log('saving changes');
    for (let i = 0, len = this.parent.data.length; i < len; i++) {
      const value = this.parent.data[i][data.idCol];
      if (value.idRow === data.idRow) {
        this.parent.data[i][data.idCol].value = data.newValue;
      }
    }
  }

  sortData() {
    this.sortOrder = !this.sortOrder;
    console.log('sort table');

    insertSort(this.parent.data, this.sortOrder);
    this.emit('renderNewData', this.parent.data);
  }

  filterData(searchValue) {
    if (searchValue === '') {
      this.emit('renderNewData', this.parent.data);
      return;
    }
    console.log('search in table');
    const filteredData = [];

    for (let i = 0, len = this.parent.data.length; i < len; i++) {
      const row = this.parent.data[i];
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