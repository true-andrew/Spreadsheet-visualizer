import {createDOMElement} from "../../helper.js";
import {
  FieldEditorText,
  FieldEditorTextarea
} from "./FieldEditor.js";
import {BaseComponent} from "../BaseComponent.js";
import {DatePickerTextField} from "../Datepicker/DatePickerTextField.js";


export class TextField extends BaseComponent {
  constructor(mountPoint, field, tableComponent) {
    super(mountPoint);
    this.tableComponent = tableComponent;
    this.type = field.type;
    this.value = field.value;
    this.idRow = field.idRow;
    this.idCol = field.idCol;
    this.init();
  }

  // type;
  // value;
  // idRow;
  // idCol;
  // tableComponent;

  handleEvent(e) {
    if (e.type === 'dblclick') {
      this.edit();
    } else if (e.type === 'endEdit') {
      this.saveChanges(e.detail);
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
    editingField.container.addEventListener('endEdit', this);
  }

  saveChanges(newValue) {
    this.container.textContent = newValue;
    this.value = newValue;
    this.tableComponent.saveChanges({
      idRow: this.idRow,
      idCol: this.idCol,
      newValue
    });
    // this.initEventListeners();
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
  return new targetClass(field.container, field.value, field.type);
}