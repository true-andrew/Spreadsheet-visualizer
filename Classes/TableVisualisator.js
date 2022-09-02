import {Field} from "./Field.js";
import {createDOMElement} from "../helper.js";
import {contextMenu} from "./ContextMenu.js";
import {BaseComponent} from "./BaseComponent.js";

export class TableVisualisator extends BaseComponent {
  constructor(container, parent) {
    super({
      mountPoint: container,
      parent,
    });
    this.generateCells(this.parent.data);
  }

  initContainer() {
    this.container = createDOMElement('table', undefined, 'table');
  }

  generateCells(data) {
    this.container.textContent = '';

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];
      for (let j = 0, len = fields.length; j < len; j++) {
        const field = new Field(row, fields[j]);
        field.on('saveChanges', this.parent);
      }
      this.container.append(row);
    }
  }
}