import {createDOMElement} from "../helper.js";
import {BaseComponent} from "../BaseComponent.js";


export class FieldEditor extends BaseComponent {
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
      outputValue = this.field.value;
    }
    this.domComponent.dispatchEvent(new CustomEvent('endEdit', {detail: outputValue}));
  }

  handleEvent_keypress(e) {
    if (e.key === 'Enter') {
      this.domComponent.dispatchEvent(new CustomEvent('endEdit', {detail: this.inputElement.value}));
    }
  }

  createEditFieldContainer() {
    const propContainer = createDOMElement('div', undefined, 'editing-field');
    const btnContainer = this.createBtnGroup();
    propContainer.append(btnContainer);
    return propContainer;
  }

  createBtnGroup() {
    const btnContainer = createDOMElement('div');

    this.saveBtn = createDOMElement('button', 'Save', 'button', {action: 'saveChanges'});
    this.discardBtn = createDOMElement('button', 'Discard', 'button', {action: 'discardChanges'});
    btnContainer.append(this.saveBtn, this.discardBtn);

    return btnContainer;
  }

  initEvents() {
    this.saveBtn.addEventListener('click', this);
    this.discardBtn.addEventListener('click', this);
  }
}

export class FieldEditorText extends FieldEditor {
  renderComponent() {
    this.domComponent = this.createEditFieldInput(this.field.type, this.field.value);
  }

  createEditFieldInput(type, value) {
    const container = this.createEditFieldContainer();
    this.inputElement = this.createInputElement(type, value);
    container.prepend(this.inputElement);
    return container;
  }

  createInputElement(type, value) {
    const inputElement = createDOMElement('input', undefined, 'editing-field_input');
    inputElement.addEventListener('keypress', this);
    inputElement.type = type;
    // inputElement.size = value.toString().length;
    inputElement.value = value;
    return inputElement;
  }
}

export class FieldEditorTextarea extends FieldEditor {
  renderComponent() {
    this.domComponent = this.createEditFieldTextarea();
  }

  createEditFieldTextarea() {
    const container = this.createEditFieldContainer();
    this.inputElement = createDOMElement('textarea', undefined, 'editing-field_textarea');
    this.inputElement.value = this.field.value;
    container.prepend(this.inputElement);
    return container;
  }
}