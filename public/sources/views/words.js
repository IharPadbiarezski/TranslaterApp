import {JetView} from "webix-jet";
import {words} from "../models/words";

export default class VocabularyList extends JetView {
	config() {
		const list = {
			view: "list",
			type: "space",
			localId: "list",
			scroll: "auto",
			template: "#English# - #Russian#"
		};

		const addWordButton = {
			view: "toolbar",
			borderless: true,
			elements: [
				{
					view: "button",
					label: "Export to Excel",
					css: "webix_secondary",
					align: "right",
					inputWidth: 200,
					click: () => {
						webix.toExcel(this.$$("list"), {
							filename: "words",
							name: "Words",
							columns: {
								Russian: {header: "Russian", width: 200},
								English: {header: "English", width: 200}
							}
						});
					}
				},
				{
					view: "button",
					label: "+ Add Word",
					localId: "addWordButton",
					autoheight: true,
					css: "webix_primary",
					align: "right",
					inputWidth: 200,
					click: () => {
						console.log("add button");
					}
				}
			]
		};

		return {
			rows: [
				list,
				addWordButton
			]
		};
	}

	init() {
		this.$$("list").sync(words);
	}

	// urlChange() {
	// 	webix.promise.all([
	// 		users.waitData,
	// 		userData.waitData
	// 	]).then(() => {
	// 		let id = this.getParam("id") || users.getFirstId();
	// 		if (id && users.exists(id)) {
	// 			this.$$("list").select(id);
	// 		}
	// 		else {
	// 			id = "";
	// 		}
	// 		userData.data.filter(obj => obj.userId === id);
	// 	});
	// }
}
