import {JetView} from "webix-jet";
import {wordsGroups} from "../../models/wordsGroups";

export default class GroupWindow extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: "Create Group"
				}
			]
		};

		const form = {
			view: "form",
			localId: "form",
			rows: [
				{
					view: "text",
					name: "Name",
					label: "Name",
					attributes: {
						maxlength: 15
					},
					labelWidth: 80
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
								wordsGroups.add(values);
								this.$$("form").clear();
								this.hideWindow();
							}
						}
					]
				}
			]
		};

		return {
			view: "window",
			head: false,
			position: "center",
			modal: true,
			body: {
				width: 400,
				rows: [
					toolbar,
					form
				]
			}
		};
	}

	showWindow() {
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
