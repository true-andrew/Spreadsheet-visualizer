import {TableComponent} from "./Table/TableComponent.js";
import {documentsModel} from "./data.js";

const container = document.getElementById('table_component');
const table = new TableComponent({});
table.init();
await table.loadData();
table.mountPoint = container;
table.renderComponent();
setTimeout(() => {
  table.mountComponent();
}, 1500)