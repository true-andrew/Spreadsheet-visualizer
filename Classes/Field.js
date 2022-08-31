import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";
import {
  FieldEditText,
  FieldEditSelect,
  FieldEditorTextarea
} from "./FieldEdtor.js";
import {DatePicker} from "./DatePicker.js";
import {ContextMenu} from "./ContextMenu.js";

export class Field extends EventEmitter {
  constructor(container, field, idObj) {
    super();
    this.type = field.type;
    this.value = field.value;
    this.idRow = idObj.idRow;
    this.idCol = idObj.idCol;
    this.container = this.createFieldContainer();
    container.append(this.container);
  }

  container = undefined;
  contextMenu = null;

  handleEvent(e, data) {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      this.contextMenu = new ContextMenu(this.container);
      this.contextMenu.on('editField', this);
      this.contextMenu.openContextMenu(e);
    } else if (e === 'editField') {
      this.edit();
    } else if (e === 'endEdit') {
      this.saveChanges(data)
    } else {
      throw new Error(`Field class doesn't have event: ${e}`)
    }
  }

  createFieldContainer() {
    const td = createDOMElement('td', this.value);
    td.title = this.type;
    td.addEventListener('contextmenu', this);
    this.container = createDOMElement('div');
    this.container.append(td);
    return td;
  }

  edit() {
    this.container.replaceChildren();
    const editingField = createEditField(this);
    editingField.on('endEdit', this);
  }

  saveChanges(newValue) {
    this.container.replaceChildren();
    this.container.textContent = newValue;
    this.emit('saveChanges', {
      field: this,
      newValue
    });
  }
}

const options = {
  'number': FieldEditText,
  'color': FieldEditText,
  'range': FieldEditText,
  'select': FieldEditSelect,
  'text': FieldEditText,
  'textarea': FieldEditorTextarea,
  'date': DatePicker,
}

function createEditField(field) {
  const targetClass = options[field.type];
  return new targetClass(field.container, field);
}