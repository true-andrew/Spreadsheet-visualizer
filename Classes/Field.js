import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";
import {
  FieldEditText,
  FieldEditorTextarea
} from "./FieldEdtor.js";
import {DatePicker} from "./DatePicker.js";
import {contextMenu} from "./ContextMenu.js";

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

  createFieldContainer() {
    const td = createDOMElement('td', this.value);
    td.title = this.type;
    td.addEventListener('contextmenu', this);
    this.container = createDOMElement('div');
    this.container.append(td);
    return td;
  }

  edit() {
    this.container.textContent = '';
    const editingField = createEditField(this);
    editingField.on('endEdit', this);
  }

  saveChanges(newValue) {
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
  'text': FieldEditText,
  'textarea': FieldEditorTextarea,
  'date': DatePicker,
}

function createEditField(field) {
  const targetClass = options[field.type];
  return new targetClass(field.container, field);
}