import {EventEmitter} from "./EventEmitter.js";
import {ContextMenu} from "./ContextMenu.js";
import {Field} from "./Field.js";
import {createDOMElement} from "../helper.js";

export class TableWrapper extends EventEmitter {
  container = undefined;
  isEditing = false;

  constructor() {
    super();
    this.initContainer();
    this.on('editField', this);
  }

  handleEvent(e, data) {
    if (e === 'callContextMenu') {
      if (this.isEditing) {
        return;
      }
      this.contextMenu.openContextMenu(data);
    } else if (e === 'editField') {
      this.isEditing = true;
    }
  }

  initContainer() {
    this.container = createDOMElement('table', '', 'table');
  }

  // show() {
  //   this.container.style.display = '';
  // }
  //
  // hide() {
  //   this.container.style.display = 'none';
  // }

  generateCells(data) {
    this.container.textContent = '';
    this.contextMenu = new ContextMenu(this.container);
    this.contextMenu.on('callContextMenu', this);

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];
      for (let j = 0, len = fields.length; j < len; j++) {
        const dataObject = fields[j];
        const field = new Field(row, dataObject);
        field.idRow = i;
        field.idCol = j;
      }
      this.container.append(row);
    }
  }

  render(container, data) {
    this.generateCells(data);
    container.append(this.container);
  }
}