import {createDOMElement} from "../helper.js";
import {BaseComponent} from "../BaseComponent.js";
import {TextField} from "../Fields/TextField.js";
import {HeaderField} from "../Fields/HeaderField.js";
import {UserField} from "../Fields/UserField.js";

export class TableVisualisator extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.tableComponent.domComponent,
      tableComponent: options.tableComponent
    });
  }


  init() {
    super.init();
  }

  createDomElements() {
    this.domComponent = createDOMElement('table', undefined, 'table');
  }

  generateCells(data) {
    console.log('render data');
    this.domComponent.textContent = '';

    for (let i = 0, len = data.length; i < len; i++) {
      const row = createDOMElement('tr');
      const fields = data[i];

      for (let j = 0, len = fields.length; j < len; j++) {
        const field = fields[j];
        createField(row, field, this.tableComponent);
      }
      this.domComponent.append(row);
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

function createField(mountPoint, field, tableComponent) {
  return new fields[field.type]({mountPoint, field, tableComponent});
}