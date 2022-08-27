import {createDOMElement} from "../helper.js";
import {EventEmitter} from "./EventEmitter.js";

export class ContextMenu extends EventEmitter {
  constructor() {
    super();
    this.initContainer();
  }

  container = undefined;
  savedField = undefined;

  handleEvent(e) {
    if (e.type === 'blur') {
      this.hide();
    } else if (e.type === 'click') {
      //handleEditField()
      this.hide();
      this.emit('editField', this.savedField);
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
    }
  }

  show(x, y) {
    this.container.style.top = y + 'px';
    this.container.style.left = x + 'px';
    this.container.classList.add('visible');
    this.container.focus();
  }

  hide() {
    this.container.classList.remove('visible');
  }

  initContainer() {
    const template = createDOMElement('div');
    template.id = 'context_menu';
    const editOption = createDOMElement('div', 'Edit');
    template.append(editOption);
    template.tabIndex = -1;
    template.addEventListener('blur', this);
    template.addEventListener('click', this);
    template.addEventListener('contextmenu', this);
    this.container = template;
  }

  openContextMenu(data) {
    const x = data.position.x;
    const y = data.position.y;
    this.savedField = data.field;
    this.show(x, y);
  }

}