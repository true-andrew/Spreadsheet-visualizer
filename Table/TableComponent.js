import {createDOMElement} from "../helper.js";
import {dataSets, TABLE_DATA_TYPES, getData} from "../data.js";
import {BaseComponent} from "../BaseComponent.js";
import {TableDataModel} from "./TableDataModel.js";
import {Search} from "../Search/Search.js";
import {DatePicker} from "../Datepicker/DatePicker.js";

export class TableComponent extends BaseComponent {
  dataModel;
  searchComponent;
  dateRangeComponent;
  tableHeader;
  tableBody;
  tableContainer;
  columnTypesSet = {};
  editingCell = null;

  handleEvent(e) {
    if (e.type === 'click') {
      this.changeDataSource(e.target.dataset.dataName);
    } else {
      throw new Error(`Unhandled event: ${e.type}`);
    }
  }

  init() {
    this.dataModel = new TableDataModel();
    this.dataModel.init();

    this.searchComponent = new Search({tableComponent: this});
    this.searchComponent.init();

    this.dateRangeComponent = new DatePicker({dateRange: true, tableComponent: this});
    this.dateRangeComponent.init();
  }

  renderComponent() {
    this.domComponent = createDOMElement('div', undefined, 'table-component');

    this.searchComponent.mountPoint = this.domComponent;
    this.searchComponent.renderComponent();

    this.dateRangeComponent.mountPoint = this.domComponent;
    this.dateRangeComponent.renderComponent();

    const welcomeContainer = createDOMElement('h3', 'Choose a source of data');
    this.domComponent.append(welcomeContainer, this.createBtnGroup());
  }

  mountComponent() {
    this.mountPoint.classList.remove('loader');
    super.mountComponent();
  }

  sortData(colNumber, colType) {
    if (this.editingCell !== null) {
      return;
    }
    this.dataModel.setFilter('sort', {colNumber, colType});
    this.renderTableBody();
  }

  searchData(data) {
    if (this.editingCell !== null) {
      return;
    }
    this.dataModel.setFilter('search', data);
    this.renderTableBody();
  }

  searchDateRange(data) {
    this.dataModel.setFilter('searchDateRange', data);
    this.renderTableBody();
  }

  saveChanges(newValue) {
    this.editingCell.classList.remove('table-cell_editing');
    this.editingCell.textContent = newValue;
    this.dataModel.saveChanges({
      idRow: Number(this.editingCell.dataset.idRow),
      idCol: Number(this.editingCell.dataset.idCol),
      newValue,
    });
    this.editingCell = null;
  }

  changeDataSource(dataName) {
    if (this.dataModel.name === dataName) {
      return;
    }
    this.toggleTableLoading();
    getData(dataName).then((res) => {
      this.toggleTableLoading();
      this.updateDataModel(res);
    });
  }

  toggleTableLoading() {
    this.domComponent.classList.toggle('table-component_changing');
  }

  updateDataModel(dataModel) {
    this.dataModel.setDataModel(dataModel);
    if (this.tableContainer === undefined) {
      this.domComponent.textContent = '';
      this.renderTableWithControllers();
    } else {
      this.searchComponent.createSelector(this.dataModel.columns);
      this.dateRangeComponent.inputElement.textContent = '';
      this.renderTableHeader();
      this.renderTableBody();
    }
  }

  createBtnGroup() {
    const btnGroup = createDOMElement('div');
    const datasetsNames = Object.keys(dataSets);
    for (let i = 0, len = datasetsNames.length; i < len; i++) {
      const button = createDOMElement('button', datasetsNames[i], 'button', {
        dataName: datasetsNames[i],
      });
      button.addEventListener('click', this);
      btnGroup.append(button);
    }
    return btnGroup;
  }

  renderTableWithControllers() {
    this.tableContainer = createDOMElement('div', undefined, 'table-container');
    const tableElement = createDOMElement('table', undefined, 'table');
    this.tableHeader = createDOMElement('thead');
    this.tableBody = createDOMElement('tbody');
    this.renderTableHeader();
    this.renderTableBody();
    tableElement.append(this.tableHeader, this.tableBody);
    this.tableContainer.append(tableElement);

    this.searchComponent.createSelector(this.dataModel.columns);
    this.searchComponent.mountComponent();
    this.dateRangeComponent.mountComponent();
    this.domComponent.append(this.tableContainer, this.createBtnGroup());
  }

  renderTableHeader() {
    this.tableHeader.textContent = '';
    for (let i = 0, len = this.dataModel.columns.length; i < len; i++) {
      const elem = this.dataModel.columns[i];
      if (this.columnTypesSet[elem.type] === undefined) {
        const columnClass = getColumnClassByType(elem.type);
        const columnType = new columnClass(this);
        columnType.renderComponent();
        columnType.mountComponent();
        this.columnTypesSet[elem.type] = columnType;
      }
      this.tableHeader.append(this.columnTypesSet[elem.type].createHeader(elem.name, elem.type, i));
    }
  }

  renderTableBody() {
    console.log('render data');
    this.tableBody.textContent = '';
    const data = this.dataModel.getValues();
    const documentFragment = document.createDocumentFragment();

    for (let i = 0, len = data.length; i < len; i++) {
      const tr = createDOMElement('tr', undefined, 'table__row');
      for (let j = 0, len = data[i].length; j < len; j++) {
        const elem = data[i][j];
        const td = this.columnTypesSet[elem.type].createCell(elem);
        tr.append(td);
      }
      documentFragment.append(tr);
    }

    this.tableBody.replaceChildren(documentFragment);
  }
}

/**/

class Column {
  constructor(tableComponent) {
    this.tableComponent = tableComponent;
  }

  tableComponent;

  handleEvent(e) {
    if (e.type === 'click') {
      this.tableComponent.sortData(e.target.dataset.colNumber, e.target.dataset.colType);
    } else {
      throw new Error(`Unhandled event: ${e.type}`);
    }
  }

  createHeader(name, type, colNumber) {
    const th = createDOMElement('th', name, 'table-header', {
      action: 'sortData',
      colNumber,
      colType: type,
    });
    th.addEventListener('click', this);

    return th;
  }

  createCell(value, idRow, idCol) {
    return createDOMElement('td', value, 'table-cell', {idRow, idCol});
  }

  editCell() {
  }

  renderComponent() {
  }

  mountComponent() {
  }
}

class PopUpColumn extends Column {
  timeout;

  handleEvent(e) {
    if (e.type === 'mouseenter') {
      this.setTimer(e);
    } else if (e.type === 'mouseleave') {
      this.hidePopUp(e);
    } else {
      super.handleEvent(e);
    }
  }

  setTimer(e) {
    this.timeout = setTimeout(this.showPopUp, 500, e, this.popup);
  }

  showPopUp(e) {
  }

  hidePopUp(e) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

class TextColumn extends Column {
  handleEvent(e) {
    if (e.type === 'dblclick') {
      this.editCell(e.target);
    } else if (e.type === 'blur') {
      this.tableComponent.saveChanges(e.target.value);
    } else if (e.type === 'keypress') {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    } else {
      super.handleEvent(e);
    }
  }

  createCell(dataObj) {
    const td = super.createCell(dataObj.value, dataObj.idRow, dataObj.idCol);
    td.addEventListener('dblclick', this);
    return td;
  }

  editCell(td) {
    if (this.tableComponent.editingCell !== null) {
      return;
    }
    this.tableComponent.editingCell = td;
    td.classList.add('table-cell_editing');
    const tdSizes = td.getBoundingClientRect();
    const inputElement = createDOMElement('input', undefined, 'table-cell__input');
    inputElement.type = 'text';
    inputElement.value = td.textContent;
    inputElement.style.height = tdSizes.height + 'px';
    inputElement.addEventListener('blur', this);
    inputElement.addEventListener('keypress', this);
    td.textContent = '';
    td.append(inputElement);
  }

}

class NumberColumn extends TextColumn {
  createCell(dataObj) {
    const td = super.createCell(dataObj);
    td.style.textAlign = 'right';
    return td;
  }

  editCell(td) {
    super.editCell(td);
    td.firstChild.type = 'number';
  }
}

class DateColumn extends PopUpColumn {
  handleEvent(e) {
    if (e.type === 'dblclick') {
      this.showPopUp(e);
    } else if (e.type === 'blur') {
      if (e.relatedTarget !== this.datePicker.calendar && e.relatedTarget !== this.datePicker.todayBtn) {
        this.hidePopUp();
      }
    } else if (e.type === 'scroll') {
      this.setNewDatePickerPosition(e);
    } else {
      super.handleEvent(e);
    }
  }

  renderComponent() {
    this.datePicker = new DatePicker({});
    this.datePicker.init();
    this.datePicker.renderComponent();
    this.datePicker.inputElement.addEventListener('blur', this);
    this.datePicker.domComponent.style.display = 'none';
    this.datePicker.domComponent.style.position = 'absolute';
  }

  mountComponent() {
    this.datePicker.mountPoint = document.body;
    this.datePicker.mountComponent();
  }

  createCell(dataObj) {
    const td = super.createCell(dataObj.value, dataObj.idRow, dataObj.idCol);
    td.addEventListener('dblclick', this);
    return td;
  }

  setNewDatePickerPosition(e) {
    const currentCellPosition = this.tableComponent.editingCell.getBoundingClientRect();
    const tablePosition = e.target.getBoundingClientRect();
    if (tablePosition.top > currentCellPosition.top || tablePosition.bottom < currentCellPosition.top) {
      this.datePicker.domComponent.style.display = 'none';
      return;
    }
    this.datePicker.domComponent.style.top = currentCellPosition.top + document.documentElement.scrollTop + 'px';
  }

  showPopUp(e) {
    this.tableComponent.editingCell = e.target;
    const elemCoords = e.target.getBoundingClientRect();
    this.tableComponent.tableContainer.addEventListener('scroll', this);
    this.datePicker.domComponent.style.top = elemCoords.top + document.documentElement.scrollTop + 'px';
    this.datePicker.domComponent.style.left = elemCoords.left + 'px';
    this.datePicker.domComponent.style.width = elemCoords.width + 'px';
    this.datePicker.domComponent.style.height = elemCoords.height + 'px';
    this.datePicker.domComponent.style.display = '';
    this.datePicker.setInitDate(e.target.textContent);
    this.datePicker.show();
  }

  hidePopUp() {
      this.datePicker.domComponent.style.display = 'none';
      this.tableComponent.tableContainer.removeEventListener('scroll', this);
      this.tableComponent.saveChanges(this.datePicker.inputElement.value);
  }
}

class UserColumn extends PopUpColumn {
  timeout;

  renderComponent() {
    this.popup = createDOMElement('div', undefined, 'user-card');
    this.popup.classList.add('table__user-card');
    this.popup.addEventListener('mouseleave', this);
  }

  mountComponent() {
    document.body.append(this.popup);
  }

  createCell(dataObj) {
    const td = super.createCell(dataObj.value.name, dataObj.idRow, dataObj.idCol);
    td.dataset.name = dataObj.value.name;
    td.dataset.additional = JSON.stringify(dataObj.value.additional);
    td.classList.add('user-field');
    td.addEventListener('mouseenter', this);
    td.addEventListener('mouseleave', this);
    return td;
  }

  hidePopUp(e) {
    super.hidePopUp(e);
    if (e.relatedTarget === this.popup) {
      return;
    }
    this.popup.style.display = 'none';
    this.popup.textContent = '';
  }

  showPopUp(e, popup) {
    const elemCoords = e.target.getBoundingClientRect();
    popup.style.top = elemCoords.bottom + document.documentElement.scrollTop + 'px';
    popup.style.left = elemCoords.left + 'px';
    popup.style.display = 'flex';

    const userName = e.target.dataset.name;
    const userInfo = JSON.parse(e.target.dataset.additional);

    const photo = createDOMElement('div', undefined, 'user-card__photo');
    const name = createDOMElement('h3', userName);
    const additionalInfo = Object.keys(userInfo);
    popup.append(photo, name);

    for (let i = 0, len = additionalInfo.length; i < len; i++) {
      const propName = additionalInfo[i];
      const p = createDOMElement('p', `${propName}: ${userInfo[propName]}`);
      popup.append(p);
    }
  }
}

function getColumnClassByType(type) {
  if (type === TABLE_DATA_TYPES.TEXT) {
    return TextColumn;
  } else if (type === TABLE_DATA_TYPES.NUMBER) {
    return NumberColumn;
  } else if (type === TABLE_DATA_TYPES.DATE) {
    return DateColumn;
  } else if (type === TABLE_DATA_TYPES.USER) {
    return UserColumn;
  }
}