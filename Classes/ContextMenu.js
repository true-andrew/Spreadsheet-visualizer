import {createDOMElement} from "../helper.js";
import {BaseComponent} from "./BaseComponent.js";

class ContextMenu extends BaseComponent {
  constructor(mountPoint) {
    super({
      mountPoint,
    });
  }

  handleEvent(e) {
    if (e.type === 'blur') {
      this.hide();
    } else if (e.type === 'click') {
      this.handleEditField()
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
    }
  }

  handleEditField() {
    this.hide();
    this.emit('editField', this.field);
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
    const template = createDOMElement('div', 'Edit');
    template.id = 'context_menu';
    template.tabIndex = -1;
    template.addEventListener('blur', this);
    template.addEventListener('click', this);
    template.addEventListener('contextmenu', this);
    this.container = template
  }

  openContextMenuAndSaveField(e, field) {
    this.field = field;
    this.show(e.clientX, e.clientY);
  }
}

export const contextMenu = new ContextMenu(document.body);