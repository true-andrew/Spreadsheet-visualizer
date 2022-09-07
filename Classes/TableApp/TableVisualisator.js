import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";
import {Field} from "../Fields/Field.js";
import {HeaderField} from "../Fields/HeaderField.js";

export class TableVisualisator extends BaseComponent {
  constructor(container, tableApp) {
    super({
      mountPoint: container,
      tableApp,
    });
  }

  init() {
    super.init();
    this.generateCells(this.tableApp.data);
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
        const field = fields[j];
        createField(row, field, this.tableApp);
      }

      this.container.append(row);
    }
  }
}

const fields = {
  'number': Field,
  'text': Field,
  'textarea': Field,
  'date': Field,
  'header': HeaderField
}

function createField(mountPoint, fieldObj, eventHandler) {
  const fieldClass = fields[fieldObj.type];
  const field = new fieldClass(mountPoint, fieldObj);
  field.on(fieldClass.eventName, eventHandler);
  return field;
}