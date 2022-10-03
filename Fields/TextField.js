import {createDOMElement} from "../helper.js";
import {
  FieldEditorText,
  FieldEditorTextarea
} from "./FieldEditor.js";
import {BaseComponent} from "../BaseComponent.js";
import {DatePickerTextField} from "./DatePickerTextField.js";


export class TextField extends BaseComponent {
  handleEvent(e) {
    if (e.type === 'dblclick') {
      this.editField();
    } else if (e.type === 'endEdit') {
      this.saveChanges(e);
    } else {
      throw new Error(`Field class doesn't have event: ${e}`);
    }
  }

  renderComponent() {
    this.domComponent = createDOMElement('td', this.field.value);
    this.domComponent.title = this.field.type;
  }

  initEvents() {
    this.domComponent.addEventListener('dblclick', this);
  }

  removeEvents() {
    this.domComponent.removeEventListener('dblclick', this);
  }

  editField() {
    if (this.tableComponent.isCellEditing) {
      return;
    }
    this.tableComponent.isCellEditing = true;
    this.domComponent.textContent = '';
    this.removeEvents();
    const editingField = createEditField(this);
    editingField.init();
    editingField.mountPoint = this.domComponent;
    editingField.renderComponent();
    editingField.mountComponent(this.domComponent);
    editingField.domComponent.addEventListener('endEdit', this);
  }

  saveChanges(e) {
    this.tableComponent.saveChanges({
      idRow: this.field.idRow,
      idCol: this.field.idCol,
      newValue: e.detail
    });
    this.domComponent.textContent = e.detail;
    this.initEvents();
  }
}

const options = {
  'number': FieldEditorText,
  'text': FieldEditorText,
  'textarea': FieldEditorTextarea,
  'date': DatePickerTextField
}

function createEditField(cell) {
  return  new options[cell.field.type]({field: cell.field});
}