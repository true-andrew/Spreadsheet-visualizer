import {getData} from "./data.js";
import {TableComponent} from "./Classes/TableApp/TableComponent.js";


const container = document.getElementById('table_component');
const table = new TableComponent(container, getData);