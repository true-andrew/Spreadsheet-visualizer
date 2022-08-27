import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";
import {
  ControlOptionArray,
  ControlOptionInput,
  ControlOptionSelect,
  ControlOptionTextarea
} from "./ControlOptions.js";
import {DatePicker} from "./DatePicker.js";

export class Field extends EventEmitter {
  constructor(field) {
    super();
    this.type = field.type;
    this.value = field.value;
    this.createFieldContainer();
    super.on('editField', this);
  }

  container = undefined;

  handleEvent(e, data) {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      super.emit('callContextMenu', {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        field: this,
      });
    } else if (e === 'editField') {
      if (data === this) {
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
  }

  edit() {
    this.container.textContent = '';
    let controlOption;
    if (this.type === 'date') {
      this.container.classList.add('date-picker');
      controlOption = new DatePicker(this.container);
    } else {
      controlOption = createControl(this);
      this.container.append(controlOption.container);
    }
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
  'array': ControlOptionArray,
  'text': ControlOptionInput,
  'textarea': ControlOptionTextarea,
}

function createControl(controlOption) {
  const targetClass = options[controlOption.type];
  return new targetClass(controlOption);
}