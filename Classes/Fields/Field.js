import {createDOMElement} from "../../helper.js";
import {
  FieldEditText,
  FieldEditorTextarea
} from "./FieldEdtor.js";
import {DatePicker} from "../Datepicker/DatePicker.js";
import {BaseComponent} from "../BaseComponent.js";

export class Field extends BaseComponent {
  constructor(mountPoint, field) {
    super(mountPoint);
    this.type = field.type;
    this.value = field.value;
    this.idRow = field.idRow;
    this.idCol = field.idCol;
    this.init();
  }

  static eventName = 'saveChanges';

  handleEvent(e, data) {
    if (e.type === 'dblclick') {
      this.edit();
    } else if (e === 'endEdit') {
      this.saveChanges(data);
    } else {
      throw new Error(`Field class doesn't have event: ${e}`);
    }
  }

  initContainer() {
    this.container = createDOMElement('td', this.value);
    this.container.title = this.type;
  }

  initEventListeners() {
    this.container.addEventListener('dblclick', this);
  }

  removeEventListeners() {
    this.container.removeEventListener('dblclick', this);
  }

  edit() {
    this.container.textContent = '';
    this.removeEventListeners();
    const editingField = createEditField(this);
    editingField.on('endEdit', this);
  }

  saveChanges(newValue) {
    this.container.textContent = newValue;
    this.value = newValue;
    this.emit('saveChanges', {
      idRow: this.idRow,
      idCol: this.idCol,
      newValue
    });
    this.initEventListeners();
  }
}

const options = {
  'number': FieldEditText,
  'text': FieldEditText,
  'textarea': FieldEditorTextarea,
  'date': DatePicker
}

function createEditField(field) {
  const targetClass = options[field.type];
  return new targetClass(field.container, field);
}