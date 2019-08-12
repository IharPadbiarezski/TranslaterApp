import {JetView} from "webix-jet";
import {getResultsOfTests} from "../models/resultsOfTestsFromLocalStorage";

export default class ResultsView extends JetView {

	get datatableId() {
		return "table";
	}

	config() {
		const _ = this.app.getService("locale")._;
		const table = {
			view: "datatable",
			localId: this.datatableId,
			scroll: true,
			columns: [
				{
					id: "SerialNumber",
					header: "#",
					fillspace: true
				},
				{
					id: "TestDate",
					header: _("Test Date"),
					fillspace: true
				},
				{
					id: "Result",
					header: _("Result"),
					fillspace: true
				}
			]
		};

		return table;
	}

	init() {
		const resultsFromLocalStorage = getResultsOfTests();
		if (resultsFromLocalStorage) {
			this.$$(`${this.datatableId}`).parse(resultsFromLocalStorage);
		}
	}
}
