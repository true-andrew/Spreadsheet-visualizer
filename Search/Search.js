import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";

export class Search extends BaseComponent {
  searchInputValue = '';

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

    const searchBtn = createDOMElement('button', 'Search', 'search__button');
    searchBtn.addEventListener('click', this);
    searchContainer.append(inputElement, searchBtn);
    this.domComponent = searchContainer;
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
    this.domComponent.dispatchEvent(new CustomEvent('search', {
      detail: this.searchInputValue,
    }));
  }
}