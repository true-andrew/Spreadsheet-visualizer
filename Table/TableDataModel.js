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
  sortOrder = false;

  setFilter(filter, data) {
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
    this.data = Array.from(this.initialData);
    return this;
  }

  searchDateRange(data) {
    if (data === null) {
      this.data = this.initialData;
      return;
    }
    this.data = this.filterElems(this.compareDateRange, data);
  }

  search(data) {
    console.log('search in data');
    if (data.searchValue === '') {
      this.data = this.initialData;
      return;
    }
    this.data = this.filterElems(this.compareValue, data);
  }

  filterElems(compareFn, searchVal) {
    const filtered = [];
    filtered.push(this.data[0]);

    for (let i = 1, len = this.data.length; i < len; i++) {
      const row = this.data[i];
      for (let j = 0, len = row.length; j < len; j++) {
        const elem = row[j];
        if (compareFn(elem, searchVal) && !filtered.includes(row)) {
          filtered.push(row);
        }
      }
    }
    return filtered;
  }

  compareDateRange(elem, data) {
    if (elem.type === 'date') {
      const dateNum = dateToNumber(elem.value);
      if (dateNum >= data.start && dateNum <= data.end) {
        return true;
      }
    }
    return false;
  }

  compareValue(elem, data) {
    const compared = String(elem.value).toLowerCase().includes(data.searchValue.toLowerCase())
    if (data.colNumber !== null) {
      return data.colNumber === elem.idCol && compared;
    } else {
      return compared;
    }
  }
}