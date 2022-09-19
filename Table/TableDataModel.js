import {dateToNumber, insertSort} from "../helper.js";

export class TableDataModel {
  constructor(data) {
    this.init(data);
  }

  init(data) {
    this.data = data;
    this.initialData = Array.from(data);
  }


  data;
  initialData;
  appliedFilters = [];
  sortOrder = false;

  setFilter(filter, data) {
    // this.appliedFilters.push(filter);
    if (filter === 'sort') {
      this.sort(data)
    } else if (filter === 'search') {
      this.search(data);
    } else if (filter === 'searchDateRange') {
      this.searchDateRange(data);
    }
    return this;
  }

  getValues() {
    return this.data;
  }

  sort(data) {
    const colNumber = data.colNumber;
    console.log('sort data');
    this.sortOrder = !this.sortOrder;
    insertSort(this.data, this.sortOrder, colNumber);
  }

  saveChanges(data) {
    this.initialData[data.idRow][data.idCol].value = data.newValue;
    this.data = this.initialData;
    return this;
  }

  iterateAllElems() {
    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const elem = row[j];
      }
    }
  }

  searchDateRange(data) {
    if (data === null) {
      this.data = this.initialData;
      return;
    }
    const filtered = [];

    filtered.push(this.data[0]);

    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const col = row[j];
        if (col.type === 'date') {
          const dateNum = dateToNumber(col.value);
          if (dateNum >= data.start && dateNum <= data.end) {
            filtered.push(row);
          }
        }
      }
    }

    this.data = filtered;
  }

  search(data) {
    console.log('search in data');
    const searchValue = data.searchValue;
    const colNumber = data.colNumber;
    if (searchValue === '') {
      this.data = this.initialData;
      return;
    }

    const filteredData = [];
    //add headers to result
    filteredData.push(this.data[0]);

    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        if (colNumber !== null) {
          if (colNumber === j) {
            this.appendToFiltered(filteredData, row, j, searchValue);
          }
        } else {
          this.appendToFiltered(filteredData, row, j, searchValue);
        }
      }
    }

    this.data = filteredData;
  }

  appendToFiltered(filteredData, row, columnNumber, searchValue) {
    const fieldValue = String(row[columnNumber].value);
    if (fieldValue.toLowerCase().includes(searchValue.toLowerCase())) {
      if (!filteredData.includes(row)) {
        filteredData.push(row);
      }
    }
  }
}