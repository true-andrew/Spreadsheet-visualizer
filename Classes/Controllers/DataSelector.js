import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../../helper.js";

export class DataSelector extends BaseComponent {
  constructor(mountPoint, datasets) {
    super(mountPoint);
    this.datasets = datasets;
    this.init();
  }

  handleEvent(e) {
    this.selectDataObject(e);
  }

  initContainer() {
    this.container = createDOMElement('div', undefined, 'controller');
    const label = createDOMElement('label', 'Select source of Data');
    const dataSelector = this.createDataSelector();
    this.container.append(label, dataSelector);
  }

  createDataSelector() {
    const dataSelector = createDOMElement('select');

    const keys = Object.keys(this.datasets);
    for (let i = 0, len = keys.length; i < len; i++) {
      const option = createDOMElement('option', keys[i]);
      option.value = keys[i];
      dataSelector.append(option);
    }

    dataSelector.addEventListener('change', this);
    return dataSelector;
  }

  selectDataObject(e) {
    const dataName = e.target.value;
    this.emit('selectNewData', this.datasets[dataName]);
  }
}