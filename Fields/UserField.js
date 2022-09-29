import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";

export class UserField extends BaseComponent {
  user;

  handleEvent(e) {
    if (e.type === 'mouseenter') {
      this.showPopUp(e);
    } else if (e.type === 'mouseleave') {
      this.hidePopUp();
    }
  }

  renderComponent() {
    this.domComponent = createDOMElement('td', this.field.value, 'user-field');
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
    const name = createDOMElement('h3', this.field.value);
    const additionalInfo = Object.keys(this.field.additional);
    this.user.append(photo, name);

    for (let i = 0, len = additionalInfo.length; i < len; i++) {
      const p = createDOMElement('p', this.field.additional[additionalInfo[i]]);
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