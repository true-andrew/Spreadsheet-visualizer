import {TableWrapper} from "./TableWrapper.js";
import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";


export class TableController extends EventEmitter {
  constructor(container, data, controllers) {
    super();
    this.data = data;
    this.container = container;
    this.initControllers(controllers);
    this.initTableWrapper(container, data);
  }

  initControllers(controllers) {
    const controllersContainer = createDOMElement('div', undefined, 'controllers');

    for (let i = 0, len = controllers.length; i < len; i++) {
      const controller = controllers[i]
      const controllerName = 'tableController_' + controllers[i].name;
      this[controllerName] = new controller();
      this[controllerName].render(controllersContainer);
      this[controllerName].on(controller.eventName, this);
    }

    this.container.append(controllersContainer);
  }

  initTableWrapper(container, data) {
    this.tableWrapper = new TableWrapper();
    this.tableWrapper.render(container, data);
  }

  handleEvent(e, data) {
    if (e === 'searchTable') {
      this.filterData(data);
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
    const sorted = [].concat(this.data);

    for (let i = 0, len = sorted.length - 1; i < len; i++) {

    }

    this.tableWrapper.generateCells(sorted)
  }

  filterData(searchValue) {
    if (searchValue === '') {
      this.tableWrapper.generateCells(this.data);
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
    this.tableWrapper.generateCells(filteredData);
  }
}