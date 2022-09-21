import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";

export class UserField extends BaseComponent {
  constructor(options) {
    super({
      mountPoint: options.mountPoint,
      type: options.field.type,
      value: options.field.value,
      additional: options.field.additional,
    });
    // this.type = field.type;
    // this.value = field.value;
    // this.additional = field.additional;
    // this.init();
  }

  user;

  handleEvent(e) {
    if (e.type === 'mouseenter') {
      this.showPopUp(e);
    } else if (e.type === 'mouseleave') {
      this.hidePopUp();
    }
  }

  createDomElements() {
    this.domComponent = createDOMElement('td', this.value, 'user-field');
    // this.domComponent.style.position = 'relative';
  }

  initEvents() {
    this.domComponent.addEventListener('mouseenter', this);
    this.domComponent.addEventListener('mouseleave', this);
  }

  showPopUp(e) {
    this.createUserCard();
    this.setUserCardPosition(e);
    this.domComponent.append(this.user);
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
  }

  setUserCardPosition(e) {
    this.user.style.position = 'absolute';
    this.user.style.top = 0;
    // this.user.style.left = e.clientX + 25 + 'px';
    this.user.style.left = this.domComponent.offsetWidth + 'px';
  }
}