import {createDOMElement} from "../helper.js";
import {documentsModel} from "../data.js";
import {BaseComponent} from "../BaseComponent.js";
import {TableDataModel} from "./TableDataModel.js";
import {TextField} from "../Fields/TextField.js";
import {UserField} from "../Fields/UserField.js";
import {HeaderField} from "../Fields/HeaderField.js";
import {Search} from "../Search/Search.js";
import {DatePickerRange} from "../Datepicker/DatePickerRange.js";

export class TableComponent extends BaseComponent {
  datasets;
  isCellEditing = false;
  searchComponent;
  dateRangeComponent;

  handleEvent(e) {
    if (e.type === 'click') {
      const action = e.target.dataset.action;
      if (this[action] !== undefined) {
        this[action](e)
      } else {
        throw new Error(`Unknown action ${action}`);
      }
      // this.changeDataSource(e.target.name);
    } else {
      return new Error(`Unhandled event: ${e.type}`);
    }
  }

  init(data) {
    this.dataModel = new TableDataModel(documentsModel);
    this.dataModel.init();
    this.searchComponent = new Search({searchCategories: this.dataModel.columns, tableComponent: this});
    this.searchComponent.init();
    if (this.dataModel.dateRange) {
      this.dateRangeComponent = new DatePickerRange({});
      this.dateRangeComponent.init();
    }
  }

  renderComponent() {
    //container
    this.domComponent = createDOMElement('div');

    //controllers
    this.searchComponent.renderComponent();
    this.searchComponent.mountPoint = this.domComponent;
    this.searchComponent.mountComponent();

    if (this.dateRangeComponent) {
      this.dateRangeComponent.renderComponent();
      this.dateRangeComponent.mountPoint = this.domComponent;
      this.dateRangeComponent.mountComponent();
    }

    //table
    this.tableContainer = createDOMElement('div', undefined, 'table_container')
    this.tableElement = createDOMElement('table', undefined, 'table');
    this.tableHeader = createDOMElement('thead');
    this.tableBody = createDOMElement('tbody');

    for (let i = 0, len = this.dataModel.columns.length; i < len; i++) {
      const th = createDOMElement('th', this.dataModel.columns[i].name, 'table-header', {
        action: 'sortData',
        colNumber: i,
      });
      th.addEventListener('click', this);
      this.tableHeader.append(th);
    }

    this.renderTableBody();
    this.tableElement.append(this.tableHeader, this.tableBody);
    this.tableContainer.append(this.tableElement);

    //dataSelector
    // const dataSources = createDOMElement('div');
    // const datasetNames = Object.keys(this.datasets);
    // for (let i = 0, len = datasetNames.length; i < len; i++) {
    //   const name = datasetNames[i];
    //   const selectBtn = createDOMElement('button', name);
    //   selectBtn.name = name;
    //   selectBtn.addEventListener('click', this);
    //   dataSources.append(selectBtn);
    // }
    // this.dataSourcesContainer = dataSources;

    this.domComponent.append(this.tableContainer);
  }

  mountComponent() {
    this.mountPoint.classList.replace('loader', 'table_component');
    super.mountComponent();
  }

  sortData(e) {
    if (this.isCellEditing) {
      return;
    }
    const colNumber = Number(e.target.dataset.colNumber);
    this.dataModel.setFilter('sort', {colNumber});
    this.renderTableBody();
  }

  searchData(data) {
    if (this.isCellEditing) {
      return;
    }
    this.dataModel.setFilter('search', data);
    this.renderTableBody();
  }

  searchDateRange(data) {
    this.dataModel.setFilter('searchDateRange', data);
    this.renderData();
  }

  saveChanges(data) {
    this.isCellEditing = false;
    this.dataModel.saveChanges(data);
  }

  renderTableBody() {
    console.log('render data');
    this.tableBody.textContent = '';
    const data = this.dataModel.getValues();
    for (let i = 0, len = data.length; i < len; i++) {
      const tr = createDOMElement('tr');
      for (let j = 0, len = data[i].length; j < len; j++) {
        const td = createDOMElement('td', data[i][j]);
        tr.append(td);
      }
      this.tableBody.append(tr);
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

function createField(type, value, tableComponent) {
  return new fields[type]({value, tableComponent});
}