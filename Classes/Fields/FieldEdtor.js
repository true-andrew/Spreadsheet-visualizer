import {createDOMElement} from "../../helper.js";
import {BaseComponent} from "../BaseComponent.js";


export class FieldEditor extends BaseComponent {
  constructor(mountPoint, value, type) {
    super(mountPoint);
    this.type = type;
    this.value = value;
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

  // wasInputUpdated() {
  //   return this.value === this.inputElement.value;
  // }

  createEditFieldContainer() {
    const propContainer = createDOMElement('div', undefined, 'editing-field');
    const btnContainer = this.createBtnGroup()
    propContainer.append(btnContainer);
    return propContainer;
  }

  createBtnGroup() {
    const btnContainer = createDOMElement('div');

    this.saveBtn = createDOMElement('button', 'Save', 'button', {action: 'saveChanges'});
    this.saveBtn.addEventListener('click', this);

    this.discardBtn = createDOMElement('button', 'Discard', 'button', {action: 'discardChanges'});
    this.discardBtn.addEventListener('click', this);

    btnContainer.append(this.saveBtn, this.discardBtn);

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
    this.inputElement = this.createInputElement(type, value);
    container.prepend(this.inputElement);
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
    this.inputElement = createDOMElement('textarea', undefined, 'form__textarea');
    this.inputElement.value = this.value;
    container.prepend(this.inputElement);
    return container;
  }
}