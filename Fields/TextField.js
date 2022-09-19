import {createDOMElement} from "../helper.js";
import {
  FieldEditorText,
  FieldEditorTextarea
} from "./FieldEditor.js";
import {BaseComponent} from "../BaseComponent.js";
import {DatePickerTextField} from "../Datepicker/DatePickerTextField.js";


export class TextField extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
      type: options.field.type,
      value: options.field.value,
      idRow: options.field.idRow,
      idCol: options.field.idCol,
      tableComponent: options.tableComponent
    });
    // this.tableComponent = tableComponent;
    // this.type = field.type;
    // this.value = field.value;
    // this.idRow = field.idRow;
    // this.idCol = field.idCol;
    // this.init();
  }

  handleEvent(e) {
    if (e.type === 'dblclick') {
      this.edit();
    } else if (e.type === 'endEdit') {
      this.saveChanges(e.detail);
    } else {
      throw new Error(`Field class doesn't have event: ${e}`);
    }
  }

  createDomElements() {
    this.domComponent = createDOMElement('td', this.value);
    this.domComponent.title = this.type;
  }

  initEvents() {
    this.domComponent.addEventListener('dblclick', this);
  }

  removeEventListeners() {
    this.domComponent.removeEventListener('dblclick', this);
  }

  edit() {
    this.domComponent.textContent = '';
    this.removeEventListeners();
    const editingField = createEditField(this);
    editingField.domComponent.addEventListener('endEdit', this);
  }

  saveChanges(newValue) {
    this.domComponent.textContent = newValue;
    this.value = newValue;
    this.tableComponent.saveChanges({
      idRow: this.idRow,
      idCol: this.idCol,
      newValue
    });
  }
}

const options = {
  'number': FieldEditorText,
  'text': FieldEditorText,
  'textarea': FieldEditorTextarea,
  'date': DatePickerTextField
}

function createEditField(field) {
  const targetClass = options[field.type];
  return new targetClass({field});
}