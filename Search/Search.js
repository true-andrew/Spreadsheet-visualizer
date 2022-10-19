import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";

export class Search extends BaseComponent {
  searchInputValue = '';
  selector;

  handleEvent(e) {
    if (e.type === 'keypress') {
      this.handleKeyPress(e);
    } else if (e.type === 'click') {
      this.dispatchEvent();
    } else {
      throw new Error(`Unhandled ev: ${e.type}`);
    }
  }

  renderComponent() {
    const searchContainer = createDOMElement('div', undefined, 'search');

    const inputElement = createDOMElement('input', undefined, 'search__field');
    inputElement.placeholder = 'Search';
    inputElement.addEventListener('keypress', this);
    this.inputElement = inputElement;

    const searchBtn = createDOMElement('button', 'Search', 'button');
    searchBtn.addEventListener('click', this);

    searchContainer.append(inputElement, searchBtn);

    this.domComponent = searchContainer;
  }

  createSelector(data) {
    if(this.selector !== undefined) {
      this.selector.remove();
    }

    const selector = createDOMElement('select');
    this.selector = selector;
    const initSelectValue = createDOMElement('option', 'All columns');
    initSelectValue.value = null;
    selector.append(initSelectValue);

    for (let i = 0, len = data.length; i < len; i++) {
      const option = createDOMElement('option', data[i].name);
      option.value = i;
      selector.append(option);
    }

    this.domComponent.append(selector);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.dispatchEvent();
    }
  }

  dispatchEvent() {
    if (this.searchInputValue === this.inputElement.value) {
      return;
    }
    this.searchInputValue = this.inputElement.value;
    this.tableComponent.setFilter('search', {
      searchValue: this.searchInputValue,
      colNumber: JSON.parse(this.selector.value),
    });
    // this.domComponent.dispatchEvent(new CustomEvent('search', {
    //   detail: this.searchInputValue,
    // }));
  }
}