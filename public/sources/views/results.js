import {JetView} from "webix-jet";
import {getData} from "../models/resultsFromLS";
import Storage from "./localStorage/localStorage";

export default class ResultsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const table = {
			view: "datatable",
			localId: "table",
			scroll: true,
			columns: [
				{
					id: "SerialNumber",
					header: "#",
					fillspace: true
				},
				{
					id: "TestDate",
					header: "Test Date",
					fillspace: true
				},
				{
					id: "SerialNumber",
					header: "Serial Number",
					fillspace: true
				}
			]
		};

		return table;
	}

	init() {
		const resultsLS = getData();
		if (resultsLS) {
			this.$$("datatable").parse(resultsLS);
		}
	}
}
