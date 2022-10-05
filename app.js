import {TableComponent} from "./Table/TableComponent.js";
import {DatePicker} from "./Datepicker/DatePicker.js";
import {DatePickerRange} from "./Datepicker/DatePickerRange.js";
import {Search} from "./Search/Search.js";
import {UserCard} from "./UserCard/UserCard.js";

const container = document.getElementById('table_component');
const table = new TableComponent({});
table.init();
table.mountPoint = container;
table.renderComponent();
table.mountComponent();

//Test Components
// const range = new DatePickerRange({});
// range.init();
// range.mountPoint = document.body;
// range.renderComponent();
// range.mountComponent();
//
// const search = new Search({});
// search.init();
// search.mountPoint = document.body;
// search.renderComponent();
// search.mountComponent();
//
// const datepicker = new DatePicker({});
// datepicker.init();
// datepicker.mountPoint = document.body;
// datepicker.renderComponent();
// datepicker.mountComponent();
//
// const userCard = new UserCard({
//   value: 'UserName',
//   additional: {
//     'tel': 589589,
//     'email': 'sefmjlkfsemkl@gmail.com'
//   }
// });
// userCard.init()
// userCard.mountPoint = document.body;
// userCard.renderComponent();
// userCard.mountComponent();