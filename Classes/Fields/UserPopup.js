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
      this.showPopUp(e);
    } else if (e.type === 'mouseleave') {
      this.hidePopUp();
    }
  }

  showPopUp(e) {
    this.createUserCard();
    this.setUserCardPosition(e);
    document.body.append(this.user);
  }

  hidePopUp() {
    this.user.remove();
  }

  createUserCard() {
    this.user = createDOMElement('div', undefined, 'user-card');
    const photo = createDOMElement('div', undefined, 'user-card__photo');
    const name = createDOMElement('h3', this.value);
    const additionalInfo = Object.keys(this.additional);
    this.user.append(photo, name);

    for (let i = 0, len = additionalInfo.length; i < len; i++) {
      const p = createDOMElement('p', this.additional[additionalInfo[i]]);
      this.user.append(p);
    }

    this.user.addEventListener('mouseleave', this);
  }

  setUserCardPosition(e) {
    this.user.style.position = 'absolute';
    this.user.style.top = e.clientY;
    this.user.style.left = e.clientX;
  }

  initContainer() {
    this.container = createDOMElement('td', this.value);
  }

  initEventListeners() {
    this.container.addEventListener('mouseenter', this);
  }
}