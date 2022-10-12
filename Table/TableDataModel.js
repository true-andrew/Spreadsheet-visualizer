import {dateToNumber, insertSort} from "../helper.js";

export class TableDataModel {
  name;
  columns;
  appliedFilters = {};
  shownData;
  data;
  dateRange = false;
  //true = asc; false - desc;
  sortOrder = true;


  init() {
  }

  setDataModel(dataModel) {
    this.columns = dataModel.columns;
    this.name = dataModel.name;
    for (let i = 0, len = this.columns.length; i < len; i++) {
      if (this.columns[i].type === 'date') {
        this.dateRange = true;
      }
    }

    this.setIdToDataElems(dataModel.data);
  }

  setIdToDataElems(data) {
    this.data = [];
    for (let i = 0, len = data.length; i < len; i++) {
      for (let j = 0, len = data[i].length; j < len; j++) {
        const dataObj = {
          value: data[i][j],
          type: this.columns[j].type,
          idRow: i,
          idCol: j,
        };

        if (this.data[i] === undefined) {
          this.data[i] = [];
        }

        this.data[i].push(dataObj);
      }
    }

    this.shownData = Array.from(this.data);
  }

  setFilter(filter, data) {
    this[filter](data);
    this.appliedFilters[filter] = data;
    return this;
  }

  getValues() {
    return this.shownData;
  }

  sort(data) {
    console.log('sort data');
    this.sortOrder = !this.sortOrder;
    insertSort(this.shownData, this.sortOrder, data.colNumber, data.colType);
  }

  saveChanges(data) {
    this.data[data.idRow][data.idCol].value = data.newValue;

    const filters = Object.keys(this.appliedFilters);
    for (let i = 0, len = filters.length; i < len; i++) {
      const filter = filters[i];
      this.setFilter(filter, this.appliedFilters[filter]);
    }
  }

  searchDateRange(data) {
    if (data === null) {
      this.shownData = Array.from(this.data);
      return;
    }
    this.shownData = this.filterElems('dateRange', data);
  }

  search(searchData) {
    console.log('search in data');
    if (searchData.searchValue === '') {
      this.shownData = Array.from(this.data);
      return;
    }
    this.shownData = this.filterElems('search', searchData);
  }

  filterElems(searchMode, searchData) {
    const filtered = [];

    for (let i = 0, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const elem = row[j];
        const compareResult = compare({
          type: this.columns[j].type,
          value: elem.value
        }, searchData, searchMode) && !filtered.includes(row);
        if (searchData.colNumber !== null && searchData.colNumber !== undefined) {
          if (searchData.colNumber === j) {
            if (compareResult) {
              filtered.push(row);
            }
          }
        } else if (compareResult) {
          filtered.push(row);
        }
      }
    }
    return filtered;
  }
}

function compare(elem, searchData, searchMode) {
  if (searchMode === 'dateRange') {
    if (elem.type === 'date') {
      const dateNum = dateToNumber(elem.value);
      if (dateNum >= searchData.start && dateNum <= searchData.end) {
        return true;
      }
    }
  } else {
    const tmp = elem.type === 'object' ? elem.value.name : elem.value;
    return String(tmp).toLowerCase().includes(searchData.searchValue.toLowerCase());
  }
}