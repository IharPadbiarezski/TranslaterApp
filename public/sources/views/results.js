import {JetView} from "webix-jet";
import {getData} from "../models/resultsFromLS";

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
					fillspace: true,
				},
				{
					id: "Result",
					header: "Result",
					fillspace: true
				}
			]
		};

		return table;
	}

	init() {
		const resultsLS = getData();
		if (resultsLS) {
			this.$$("table").parse(resultsLS);
		}
	}
}
