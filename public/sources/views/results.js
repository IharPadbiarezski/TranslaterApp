import {JetView} from "webix-jet";
import {resultsOfTests} from "../models/resultsOfTests";

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
					id: "index",
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
			],
			on: {
				"data->onStoreUpdated": () => {
					resultsOfTests.data.each((obj, i) => {
						obj.index = i + 1;
					});
				}
			}
		};

		return table;
	}

	init() {
		const user = this.app.getService("user");
		const currentUser = user.getUser().id;
		resultsOfTests.waitData.then(() => {
			resultsOfTests.data.filter(result => result.UserId === currentUser);
			this.$$(`${this.datatableId}`).parse(resultsOfTests);
		});
	}
}
