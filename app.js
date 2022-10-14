import {TableComponent} from "./Table/TableComponent.js";

const container = document.getElementById('table_component');
const table = new TableComponent({});
table.init();
table.mountPoint = container;
table.renderComponent();
setTimeout(() => {
  table.mountComponent();
}, 1500)