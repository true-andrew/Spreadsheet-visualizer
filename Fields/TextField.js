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
  }

  handleEvent(e) {
    if (e.type === 'dblclick') {
      this.editField();
    } else if (e.type === 'endEdit') {
      this.tableComponent.saveChanges({
        idRow: this.idRow,
        idCol: this.idCol,
        newValue: e.detail
      });
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

  removeEvents() {
    this.domComponent.removeEventListener('dblclick', this);
  }

  editField() {
    this.domComponent.textContent = '';
    this.removeEvents();
    const editingField = createEditField(this);
    editingField.domComponent.addEventListener('endEdit', this);
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