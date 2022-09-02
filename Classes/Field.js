import {createDOMElement} from "../helper.js";
import {
  FieldEditText,
  FieldEditorTextarea
} from "./FieldEdtor.js";
import {DatePicker} from "./DatePicker.js";
import {contextMenu} from "./ContextMenu.js";
import {BaseComponent} from "./BaseComponent.js";

export class Field extends BaseComponent {
  constructor(mountPoint, field) {
    super({
      mountPoint,
      type: field.type,
      value: field.value,
      idRow: field.idRow,
      idCol: field.idCol,
    });
  }

  handleEvent(e, data) {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      contextMenu.openContextMenuAndSaveField(e, this);
    } else if (e === 'endEdit') {
      this.saveChanges(data);
    } else {
      throw new Error(`Field class doesn't have event: ${e}`)
    }
  }

  initContainer() {
    this.container = createDOMElement('td', this.value);
    this.container.title = this.type;
    this.container.addEventListener('contextmenu', this);
  }

  edit() {
    this.container.textContent = '';
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
  }
}

const options = {
  'number': FieldEditText,
  'text': FieldEditText,
  'textarea': FieldEditorTextarea,
  'date': DatePicker,
}

function createEditField(field) {
  const targetClass = options[field.type];
  return new targetClass(field.container, field);
}