import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../../helper.js";

export class UserField extends BaseComponent {
  constructor(mountPoint, field) {
    super(mountPoint);
    this.type = field.type;
    this.value = field.value;
    this.additional = field.additional;
    this.init();
  }

  user;

  handleEvent(e) {
    if (e.type === 'mouseenter') {
      this.showPopUp(e);
    } else if (e.type === 'mouseleave') {
      this.hidePopUp();
    }
  }

  initContainer() {
    this.container = createDOMElement('td', this.value);
    this.container.style.position = 'relative';
  }

  initEventListeners() {
    this.container.addEventListener('mouseenter', this);
    this.container.addEventListener('mouseleave', this);
  }

  showPopUp(e) {
    this.createUserCard();
    this.setUserCardPosition(e);
    this.container.append(this.user);
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

    // this.user.addEventListener('mouseleave', this);
  }

  setUserCardPosition(e) {
    this.user.style.position = 'absolute';
    this.user.style.zIndex = "100";
    this.user.style.top = "0";
    this.user.style.left = this.container.offsetWidth + 'px';
  }
}