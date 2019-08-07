import {JetView} from "webix-jet";
import {words} from "../../models/words";
import {partsOfSpeech} from "../../models/partsOfSpeech";

export default class WordWindow extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: "Create Word"
				}
			]
		};

		const form = {
			view: "form",
			localId: "form",
			rows: [
				{
					view: "text",
					name: "English",
					label: "English",
					attributes: {
						maxlength: 15
					}
				},
				{
					view: "text",
					name: "Russian",
					label: "Russian",
					attributes: {
						maxlength: 15
					}
				},
				{
					view: "combo",
					name: "Status",
					localId: "combo",
					label: "Choose status",
					options: partsOfSpeech
				},
				{
					cols: [
						{},
						{
							view: "button",
							css: "webix_secondary",
							label: "Cancel",
							autowidth: true,
							click: () => {
								this.hideWindow();
							}
						},
						{
							view: "button",
							value: "Save",
							autowidth: true,
							hotkey: "enter",
							css: "webix_primary",
							click: () => {
								const values = this.$$("form").getValues();
								values.GroupId = 
								values.UserId = "1"
								console.log(values);
								// words.add(values);
								this.$$("form").clear();
								this.hideWindow();
							}
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 80
			}
		};

		return {
			view: "window",
			head: false,
			position: "center",
			modal: true,
			body: {
				width: 600,
				rows: [
					toolbar,
					form
				]
			}
		};
	}

	init() {
		partsOfSpeech.waitData.then(() => {
			const value = partsOfSpeech.getFirstId();
			if (value) {
				this.$$("combo").setValue(value);
			}
		});
	}

	showWindow() {
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
