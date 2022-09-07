import {EventEmitter} from "../EventEmitter.js";
import {createDOMElement} from "../../helper.js";


export class FieldEdit extends EventEmitter {
  constructor(controlOption) {
    super();
    this.type = controlOption.type;
    this.value = controlOption.value;
  }

  container = undefined;
  inputElement = undefined;

  handleEvent(e) {
    const event = 'handleEvent_' + e.type;
    if (this[event]) {
      this[event](e);
    } else {
      throw new Error(`Unhandled event: ${e.type}`);
    }
  }

  handleEvent_click(e) {
    let outputValue;
    if (e.target === this.saveBtn) {
      outputValue = this.inputElement.value;
    } else if (e.target === this.discardBtn) {
      outputValue = this.value;
    }
    this.emit('endEdit', outputValue);
  }

  handleEvent_keypress(e) {
    if (e.key === 'Enter') {
      this.emit('endEdit', this.inputElement.value);
    }
  }

  createEditFieldContainer() {
    const propContainer = createDOMElement('div', undefined, 'editing-field');
    const btnContainer = createDOMElement('div');
    const saveBtn = createDOMElement('button', 'Save', 'button', {action: 'saveChanges'});
    saveBtn.addEventListener('click', this);
    this.saveBtn = saveBtn;
    const discardBtn = createDOMElement('button', 'Discard', 'button', {action: 'discardChanges'});
    discardBtn.addEventListener('click', this);
    this.discardBtn = discardBtn;
    btnContainer.append(saveBtn, discardBtn);
    propContainer.append(btnContainer);
    return propContainer;
  }
}

export class FieldEditText extends FieldEdit {
  constructor(container, fieldValue) {
    super(fieldValue);
    this.container = this.createEditFieldInput(this.type, this.value);
    container.append(this.container);
  }

  createEditFieldInput(type, value) {
    const container = this.createEditFieldContainer();
    const inputElement = this.createInputElement(type, value);
    container.prepend(inputElement);
    this.inputElement = inputElement;
    return container;
  }

  createInputElement(type, value) {
    const inputElement = createDOMElement('input', undefined, 'form__field');
    inputElement.addEventListener('keypress', this);

    if (this.max && this.min) {
      inputElement.max = this.max;
      inputElement.min = this.min;
    }

    inputElement.id = this.name;
    inputElement.required = true;
    inputElement.type = type;
    inputElement.value = value;
    return inputElement;
  }
}

export class FieldEditorTextarea extends FieldEdit {
  constructor(parentElement, controlOption) {
    super(controlOption);
    this.container = this.createEditFieldTextarea(controlOption.title);
    parentElement.replaceChildren(this.container);
  }

  createEditFieldTextarea() {
    const container = this.createEditFieldContainer();
    const textarea = createDOMElement('textarea', undefined, 'form__textarea');
    textarea.value = this.value;
    this.inputElement = textarea;
    container.prepend(textarea);
    return container;
  }
}