import {JetView} from "webix-jet";
import {words} from "../../models/words";
import {wordsGroups} from "../../models/wordsGroups";
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
					},
					invalidMessage: "The English word is required."
				},
				{
					view: "text",
					name: "Russian",
					label: "Russian",
					attributes: {
						maxlength: 15
					},
					invalidMessage: "The English word is required."
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
								this.$$("form").clear();
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
								if (this.$$("form").validate()) {
									const values = this.$$("form").getValues();
									const id = this.getParam("id", true);
									values.GroupId = id;
									// Change User Id field after use User plugin
									values.UserId = "1";
									let currentAmount = wordsGroups.getItem(id).Amount;
									wordsGroups.updateItem(id, {Amount: ++currentAmount});
									words.add(values);
									this.$$("form").clear();
									this.hideWindow();
								}
							}
						}
					]
				}
			],
			rules: {
				English: webix.rules.isNotEmpty,
				Russian: webix.rules.isNotEmpty
			},
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

	showWindow() {
		partsOfSpeech.waitData.then(() => {
			const value = partsOfSpeech.getFirstId();
			if (value) {
				this.$$("combo").setValue(value);
			}
		});
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
