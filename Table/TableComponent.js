import {createDOMElement} from "../helper.js";
import {getData} from "../data.js";
import {BaseComponent} from "../BaseComponent.js";
import {Search} from "../Controllers/Search.js";
import {TableDataModel} from "./TableDataModel.js";
import {TextField} from "../Fields/TextField.js";
import {UserField} from "../Fields/UserField.js";
import {HeaderField} from "../Fields/HeaderField.js";

export class TableComponent extends BaseComponent {
  datasets;
  cellIsEditing = false;

  handleEvent(e) {
    if (e.type === 'click') {
      this.changeDataSource(e.target.name);
    } else {
      return new Error(`Unhandled event: ${e.type}`);
    }
  }

  async init(data) {
    // const loader = createDOMElement('div', undefined, 'loader');
    // this.mountPoint.append(loader);
    await getData().then(res => {
      this.datasets = res;
      const firstData = Object.entries(this.datasets)[0];
      this.dataModel = new TableDataModel(firstData[1], firstData[0]);
      this.searchComponent = new Search({tableComponent: this});
    });
  }

  renderComponent() {
    //container
    this.domComponent = createDOMElement('div');

    //controllers
    this.searchComponent.createDomElements();
    this.searchElement = this.searchComponent.domComponent;

    //table
    this.tableContainer = createDOMElement('div', undefined, 'table_container')
    this.tableElement = createDOMElement('table', undefined, 'table');
    this.tableContainer.append(this.tableElement);
    this.renderData();

    //dataSelector
    const dataSources = createDOMElement('div');
    const datasetNames = Object.keys(this.datasets);
    for (let i = 0, len = datasetNames.length; i < len; i++) {
      const name = datasetNames[i];
      const selectBtn = createDOMElement('button', name);
      selectBtn.name = name;
      selectBtn.addEventListener('click', this);
      dataSources.append(selectBtn);
    }
    this.dataSourcesContainer = dataSources;

    this.domComponent.replaceChildren(this.searchElement, this.tableContainer, this.dataSourcesContainer);
  }

  mountComponent() {
    this.mountPoint.classList.replace('loader', 'table_component');
    super.mountComponent();
  }

  sortData(colNumber) {
    this.dataModel.setFilter('sort', {colNumber});
    this.renderData();
  }

  searchData(searchValue, colNumber) {
    this.dataModel.setFilter('search', {
      searchValue,
      colNumber
    });
    this.renderData();
  }

  searchDateRange(data) {
    this.dataModel.setFilter('searchDateRange', data);
    this.renderData();
  }

  saveChanges(data) {
    this.cellIsEditing = false;
    this.dataModel.saveChanges(data);
  }

  renderData() {
    console.log('render data');
    const data = this.dataModel.getValues();
    this.tableElement.textContent = '';

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];

      for (let j = 0, len = fields.length; j < len; j++) {
        const field = createField(fields[j], this);
        field.init();
        field.mountPoint = row;
        field.renderComponent();
        field.mountComponent();
      }
      this.tableElement.append(row);
    }
  }

  changeDataSource(dataName) {
    if (this.dataModel.name === dataName) {
      return;
    }
    this.dataModel = new TableDataModel(this.datasets[dataName], dataName);
    this.domComponent.remove();
    this.renderComponent();
    this.mountComponent();
  }
}

const fields = {
  'number': TextField,
  'text': TextField,
  'textarea': TextField,
  'date': TextField,
  'user': UserField,
  'header': HeaderField,
};

function createField(field, tableComponent) {
  return new fields[field.type]({field, tableComponent});
}