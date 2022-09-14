import {documents, users} from "./data.js";
import {TableComponent} from "./Classes/TableApp/TableComponent.js";

const table = new TableComponent('table_component', documents,{documents, users});