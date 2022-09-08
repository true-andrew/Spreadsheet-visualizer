import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../../helper.js";

export class UserPopup extends BaseComponent {
  constructor(mountPoint, field) {
    super(mountPoint);
    this.type = field.type;
    this.value = field.value;
    this.additional = field.additional;
    this.init();
  }

  handleEvent(e) {
    if (e.type === 'mouseenter') {
      this.showPopUp();

    } else if (e.type === 'mouseleave') {
      this.hidePopUp();
    }
  }

  showPopUp() {
    const user = createDOMElement('div', undefined, 'user-card');
    const photo = createDOMElement('div', undefined, 'user-card__photo');
    const name = createDOMElement('h3', this.value);
    const additionalInfo = Object.keys(this.additional);
    user.append(photo, name);

    for (let i = 0, len = additionalInfo.length; i < len; i++) {
      const p = createDOMElement('p', this.additional[additionalInfo[i]]);
      user.append(p);
    }
    this.container.replaceChildren(user);
  }

  hidePopUp() {
    this.container.textContent = this.value;
  }

  initContainer() {
    this.container = createDOMElement('td', this.value);
  }

  initEventListeners() {
    this.container.addEventListener('mouseenter', this);
    this.container.addEventListener('mouseleave', this)
  }

}