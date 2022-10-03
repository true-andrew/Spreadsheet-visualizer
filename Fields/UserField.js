import {BaseComponent} from "../BaseComponent.js";
import {createDOMElement} from "../helper.js";
import {UserCard} from "../UserCard.js";

export class UserField extends BaseComponent {
  user;

  handleEvent(e) {
    if (e.type === 'mouseenter') {
      this.showPopUp(e);
    } else if (e.type === 'mouseleave') {
      this.hidePopUp();
    }
  }

  init() {
    this.user = new UserCard({
      value: this.field.value,
      additional: this.field.additional,
    });
  }

  renderComponent() {
    this.domComponent = createDOMElement('td', this.field.value, 'user-field');
    this.user.mountPoint = this.domComponent;
    this.user.renderComponent();
    this.user.domComponent.style.display = 'none';
  }

  mountComponent() {
    super.mountComponent();
    this.user.mountComponent();
  }

  initEvents() {
    this.domComponent.addEventListener('mouseenter', this);
    this.domComponent.addEventListener('mouseleave', this);
  }

  showPopUp(e) {
    this.setUserCardPosition(e);
    this.user.domComponent.style.display = '';
  }

  hidePopUp() {
    this.user.domComponent.style.display = 'none';
  }

  setUserCardPosition(e) {
    this.user.domComponent.style.position = 'absolute';
    this.user.domComponent.style.top = '0';
    this.user.domComponent.style.left = this.domComponent.offsetWidth + 'px';
  }
}