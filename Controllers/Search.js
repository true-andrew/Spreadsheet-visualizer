import {createDOMElement} from "../helper.js";
import {BaseComponent} from "../BaseComponent.js";

export class Search extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
      tableComponent: options.tableComponent,
    });
    // this.tableComponent = tableComponent;
    // this.data = data;
    // this.init();
  }

  searchInputValue = '';

  handleEvent(e) {
    if (e.type === 'keypress') {
      this.handleKeyPress(e);
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  handleKeyPress(e) {
    if (this.searchInputValue === e.target.value) {
      return;
    }
    if (e.key === 'Enter') {
      this.searchInputValue = e.target.value;
      this.tableComponent.searchData(this.searchInputValue, JSON.parse(this.selectColumnElement.value));
      // this.filterData(e.target.value);
    }
  }

  createDomElements() {
    this.domComponent = createDOMElement('div', undefined, 'controller');
    this.initSearchField();
  }

  initSearchField() {
    const inputElement = createDOMElement('input');
    inputElement.placeholder = 'Search';
    inputElement.addEventListener('keypress', this);
    this.selectColumnElement = this.createSelector();
    this.domComponent.append(inputElement, this.selectColumnElement);
  }

  createSelector() {
    const selector = createDOMElement('select');

    const initSelectValue = createDOMElement('option', 'All columns');
    initSelectValue.value = null;
    selector.append(initSelectValue);

    const data = this.tableComponent.dataModel.getValues();
    for (let i = 0, len = data[0].length; i < len; i++) {
      const option = createDOMElement('option', data[0][i].value);
      option.value = i;
      selector.append(option);
    }
    return selector;
  }
}