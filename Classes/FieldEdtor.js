import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";


export class FieldEdit extends EventEmitter {
  constructor(controlOption) {
    super();
    this.type = controlOption.type;
    this.value = controlOption.value;
  }

  container = undefined;
  inputElement = undefined;

  handleEvent(ev) {
    let outputValue;
    if (ev.target === this.saveBtn) {
      outputValue = this.inputElement.value;
    } else if (ev.target === this.discardBtn) {
      outputValue = this.value;
    }
    this.emit('endEdit', outputValue);
  }

  createEditFieldContainer() {
    const propContainer = document.createDocumentFragment();
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
    this.container = this.createControlOptionInput(this.type, this.value);
    container.append(this.container);
  }

  createControlOptionInput(type, value) {
    const container = this.createEditFieldContainer();
    const inputElement = this.createInputElement(type, value);
    container.prepend(inputElement);
    this.inputElement = inputElement;
    return container;
  }

  createInputElement(type, value) {
    const inputElement = createDOMElement('input', '', 'form__field');

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

export class FieldEditSelect extends FieldEdit {
  constructor(mountPoint, controlOption) {
    super(controlOption);
    this.options = controlOption.options;
    this.container = this.createControlOptionSelect(controlOption.title);
    mountPoint.append(this.container);
  }

  createControlOptionSelect() {
    const container = this.createEditFieldContainer();
    const selectElement = this.createSelectElement();
    container.prepend(selectElement);
    return container;
  }

  createSelectElement() {
    const selectElement = createDOMElement('select', '', 'form__field');

    for (let i = 0, len = this.options.length; i < len; i++) {
      const optionName = this.options[i];
      const optionEl = createDOMElement('option', optionName);
      if (optionName === this.value) {
        optionEl.selected = true;
      }
      selectElement.append(optionEl);
    }
    return selectElement;
  }
}

export class FieldEditorTextarea extends FieldEdit {
  constructor(parentElement, controlOption) {
    super(controlOption);
    this.container = this.createControlOptionTextarea(controlOption.title);
    parentElement.replaceChildren(this.container);
  }

  createControlOptionTextarea() {
    const container = this.createEditFieldContainer();
    const textarea = createDOMElement('textarea', '', 'form__textarea');
    textarea.value = this.value;
    this.inputElement = textarea;
    container.prepend(textarea);
    return container;
  }
}