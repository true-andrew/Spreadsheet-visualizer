import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class TableController extends BaseComponent {
  tableController_Sort;
  tableController_Search;
  constructor(mountPoint, tableApp, controllers) {
    super(mountPoint);
    this.tableApp = tableApp;
    this.init();
    this.initControllers(controllers);
  }

  initContainer() {
    this.container = createDOMElement('div', undefined, 'controllers');
  }

  initControllers(controllers) {
    for (let i = 0, len = controllers.length; i < len; i++) {
      const controller = controllers[i];
      const controllerName = 'tableController_' + controllers[i].name;
      this[controllerName] = new controller(this.container, this.tableApp);
      this[controllerName].on('renderNewData', this.tableApp);
    }
  }

  saveChanges(data) {
    console.log('saving changes');
    this.tableApp.data[data.idRow][data.idCol].value = data.newValue;
  }
}