import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";


export class FieldEditor extends BaseComponent {
  constructor(mountPoint, field) {
    super(mountPoint);
    this.type = field.type;
    this.value = field.value;
    this.init();
  }

  container;
  inputElement;
  saveBtn;
  discardBtn;

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
    const btnContainer = this.createBtnGroup()
    propContainer.append(btnContainer);
    return propContainer;
  }

  createBtnGroup() {
    const btnContainer = createDOMElement('div');

    const saveBtn = createDOMElement('button', 'Save', 'button', {action: 'saveChanges'});
    saveBtn.addEventListener('click', this);
    this.saveBtn = saveBtn;

    const discardBtn = createDOMElement('button', 'Discard', 'button', {action: 'discardChanges'});
    discardBtn.addEventListener('click', this);
    this.discardBtn = discardBtn;

    btnContainer.append(saveBtn, discardBtn);

    return btnContainer;
  }
}

export class FieldEditorText extends FieldEditor {
  constructor(mountPoint, field) {
    super(mountPoint, field);
  }

  initContainer() {
    this.container = this.createEditFieldInput(this.type, this.value);
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
    inputElement.type = type;
    inputElement.value = value;
    return inputElement;
  }
}

export class FieldEditorTextarea extends FieldEditor {
  constructor(mountPoint, field) {
    super(mountPoint, field);
  }

  initContainer() {
    this.container = this.createEditFieldTextarea();
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