import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";
import {TableDataModel} from "../Table/TableDataModel.js";

export class DataSelector extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.tableComponent.mountPoint,
      tableComponent: options.tableComponent,
    });
    // this.tableComponent = data;
    // this.init();
  }

  handleEvent(e) {
    this.selectDataObject(e.target.value);
  }

  createDomElements() {
    this.domComponent = createDOMElement('div', undefined, 'controller');
    const label = createDOMElement('label', 'Select source of Data');
    const dataSelector = this.createDataSelector();
    this.domComponent.append(label, dataSelector);
  }

  createDataSelector() {
    const dataSelector = createDOMElement('select');

    const keys = Object.keys(this.tableComponent.datasets);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (i === 0) {
        this.tableComponent.dataModel = new TableDataModel(this.tableComponent.datasets[keys[i]]);
        this.tableComponent.data = this.tableComponent.dataModel.getValues();
      }
      const option = createDOMElement('option', keys[i]);
      option.value = keys[i];
      dataSelector.append(option);
    }

    dataSelector.addEventListener('change', this);
    return dataSelector;
  }

  selectDataObject(dataName) {
    this.tableComponent.changeDataSource(dataName);
  }
}