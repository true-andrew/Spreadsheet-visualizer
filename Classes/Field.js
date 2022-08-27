import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";
import {
  ControlOptionInput,
  ControlOptionSelect,
  ControlOptionTextarea
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
    this.container = td;
    return td;
  }

  edit() {
    this.container.textContent = '';
    const editingField = createEditField(this);
  }

  saveChanges(newValue) {
    this.container.replaceChildren();
    this.container.textContent = newValue;
  }
}

const options = {
  'number': ControlOptionInput,
  'color': ControlOptionInput,
  'range': ControlOptionInput,
  'select': ControlOptionSelect,
  'text': ControlOptionInput,
  'textarea': ControlOptionTextarea,
  'date': DatePicker,
}

function createEditField(controlOption) {
  const targetClass = options[controlOption.type];
  return new targetClass(controlOption);
}