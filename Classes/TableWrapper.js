import {EventEmitter} from "./EventEmitter.js";
import {ContextMenu} from "./ContextMenu.js";
import {Field} from "./Field.js";
import {createDOMElement} from "../helper.js";

export class TableWrapper extends EventEmitter {
  container = undefined;

  constructor() {
    super();
    this.initContainer();
  }

  handleEvent(e, data) {
    if (e === 'saveChanges') {
      this.emit('saveChanges', data);
    }
  }

  initContainer() {
    this.container = createDOMElement('table', '', 'table');
  }

  generateCells(data) {
    this.container.textContent = '';

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];
      for (let j = 0, len = fields.length; j < len; j++) {
        const dataObject = fields[j];
        const field = new Field(row, dataObject, {idRow: i, idCol: j});
        field.on('saveChanges', this);
      }
      this.container.append(row);
    }
  }

  render(container, data) {
    this.generateCells(data);
    container.append(this.container);
  }
}