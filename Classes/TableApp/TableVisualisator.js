import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";
import {TextField} from "../Fields/TextField.js";
import {HeaderField} from "../Fields/HeaderField.js";
import {UserField} from "../Fields/UserField.js";

export class TableVisualisator extends BaseComponent {
  constructor(mountPoint, tableComponent) {
    super(mountPoint);
    this.tableComponent = tableComponent;
    this.init();
  }

  tableComponent;

  init() {
    super.init();
    this.generateCells(this.tableComponent.data);
  }

  initContainer() {
    this.container = createDOMElement('table', undefined, 'table');
  }

  generateCells(data) {
    console.log('render data');
    this.container.textContent = '';

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];

      for (let j = 0, len = fields.length; j < len; j++) {
        const field = fields[j];
        createField(row, field, this.tableComponent);
      }

      this.container.append(row);
    }
  }
}

const fields = {
  'number': TextField,
  'text': TextField,
  'textarea': TextField,
  'date': TextField,
  'user': UserField,
  'header': HeaderField,
}

function createField(mountPoint, fieldObj, eventHandler) {
  const field = new fields[fieldObj.type](mountPoint, fieldObj);
  if (field.eventName) {
    field.on(field.eventName, eventHandler);
  }
  return field;
}