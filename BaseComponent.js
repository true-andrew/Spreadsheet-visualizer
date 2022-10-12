export class BaseComponent {
  constructor(options) {
    this.registerOptions(options);
  }

  mountPoint;
  domComponent;
  view;

  registerOptions(options) {
    const optionKeys = Object.keys(options);
    for (let i = 0; i < optionKeys.length; i++) {
      const optionName = optionKeys[i];
      this[optionName] = options[optionName]
    }
  }

  init() {
    this.initChildComponents();
  }

  initChildComponents() {
  }

  createDomElements() {
  }

  renderComponent() {
    this.renderChildComponents()
  }

  renderChildComponents() {
  }

  initEvents() {
  }

  mountComponent() {
    this.initEvents();
    this.mountPoint.append(this.domComponent);
  }
}