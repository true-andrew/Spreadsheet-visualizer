import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";
import {Search} from "../Controllers/Search.js";
import {Sort} from "../Controllers/Sort.js";

export class TableController extends BaseComponent {
  constructor(mountPoint, tableApp) {
    super(mountPoint);
    this.tableApp = tableApp;
    this.init();
    this.initControllers();
  }

  tableController_Sort;
  tableController_Search;

  initContainer() {
    this.container = createDOMElement('div', undefined, 'controllers');
  }

  initControllers() {
    this.tableController_Search = new Search(this.container, this.tableApp);
    this.tableController_Sort = new Sort(this.container, this.tableApp);
    this.tableController_Sort.on('renderNewData', this.tableApp);
    this.tableController_Search.on('renderNewData', this.tableApp);
  }

  saveChanges(data) {
    console.log('saving changes');
    this.tableApp.data[data.idRow][data.idCol].value = data.newValue;
  }
}