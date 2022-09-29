import {TableComponent} from "./Table/TableComponent.js";
import {DatePicker} from "./Datepicker/DatePicker.js";
import {DatePickerRange} from "./Datepicker/DatePickerRange.js";

const container = document.getElementById('table_component');
const table = new TableComponent({});
await table.init();
table.mountPoint = container;
table.renderComponent();
table.mountComponent();

// const datepickerContainer = document.getElementById('datepicker');
//
// const datepicker = new DatePickerRange({});
// datepicker.init();
// datepicker.mountPoint = datepickerContainer;
// datepicker.renderComponent();
// datepicker.mountComponent();