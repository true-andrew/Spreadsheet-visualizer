import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";
import {
  FieldEditText,
  FieldEditSelect,
  FieldEditorTextarea
} from "./ControlOptions.js";
import {DatePicker} from "./DatePicker.js";

export class Field extends EventEmitter {
  constructor(mountPoint, field) {
    super();
    this.type = field.type;
    this.value = field.value;
    mountPoint.append(this.createFieldContainer());
    this.on('editField', this);
  }

  container = undefined;

  handleEvent(e, field) {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      this.emit('callContextMenu', {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        field: this,
      });
    } else if (e === 'editField') {
      if (field === this) {
        this.edit();
      }
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
    debugger
    const editingField = createEditField(this);
  }

  saveChanges(newValue) {
    this.container.replaceChildren();
    this.container.textContent = newValue;
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