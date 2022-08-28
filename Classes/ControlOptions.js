import {EventEmitter} from "./EventEmitter.js";
import {createDOMElement} from "../helper.js";


export class FieldEdit extends EventEmitter {
  container = undefined;

  constructor(controlOption) {
    super();
    this.type = controlOption.type;
    this.value = controlOption.value;
    this.name = controlOption.name;
  }

  handleEvent(ev) {
    const optionValue = ev.target.value;
    this.emit('optionChanged', optionValue);
  }

  createPropContainerWithTitle(title) {
    const propContainer = createDOMElement('div', '', 'form__group');
    const labelElement = createDOMElement('label', title, 'form__label');
    labelElement.htmlFor = this.name;
    propContainer.append(labelElement);
    return propContainer;
  }

  initEventListener(element) {
    element.addEventListener('change', this);
  }
}

export class FieldEditText extends FieldEdit {
  constructor(mountPoint, controlOption) {
    super(controlOption);
    if (controlOption.max !== undefined && controlOption.min !== undefined) {
      this.min = controlOption.min;
      this.max = controlOption.max;
    }
    this.container = this.createControlOptionInput(controlOption.title, this.type, this.value);
    mountPoint.append(this.container);
  }

  createControlOptionInput(title, type, value) {
    const controlElement = super.createPropContainerWithTitle(title);
    const inputElement = this.createInputElement(type, value);
    controlElement.prepend(inputElement);
    return controlElement;
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
    super.initEventListener(inputElement);
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

  createControlOptionSelect(title) {
    const createdContainer = super.createPropContainerWithTitle(title);
    const selectElement = this.createSelectElement();
    createdContainer.prepend(selectElement);
    return createdContainer;
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
    super.initEventListener(selectElement);
    return selectElement;
  }
}

export class FieldEditorTextarea extends FieldEdit {
  constructor(parentElement, controlOption) {
    super(controlOption);
    this.container = this.createControlOptionTextarea(controlOption.title);
    parentElement.append(this.container)
  }

  createControlOptionTextarea(title) {
    const container = super.createPropContainerWithTitle(title);
    const label = container.firstChild;
    label.classList.add('form__label-textarea');
    const textarea = createDOMElement('textarea', '', 'form__textarea');
    textarea.value = this.value;
    super.initEventListener(textarea);
    container.prepend(textarea);
    return container;
  }
}