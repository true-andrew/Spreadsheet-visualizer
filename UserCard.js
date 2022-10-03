import {BaseComponent} from "./BaseComponent.js";
import {createDOMElement} from "./helper.js";

export class UserCard extends BaseComponent {
  renderComponent() {
    this.domComponent = createDOMElement('div', undefined, 'user-card');
    const photo = createDOMElement('div', undefined, 'user-card__photo');
    const name = createDOMElement('h3', this.value);
    const additionalInfo = Object.keys(this.additional);
    this.domComponent.append(photo, name);

    for (let i = 0, len = additionalInfo.length; i < len; i++) {
      const propName = additionalInfo[i];
      const p = createDOMElement('p', `${propName}: ${this.additional[propName]}`);
      this.domComponent.append(p);
    }
  }
}