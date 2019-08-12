import {JetView} from "webix-jet";
import {words} from "../../models/words";
import {partsOfSpeech} from "../../models/partsOfSpeech";

export default class WordWindow extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const toolbar = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: _("Create Word")
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
					label: _("Original"),
					attributes: {
						maxlength: 15
					},
					invalidMessage: _("The English word is required.")
				},
				{
					view: "text",
					name: "Russian",
					label: _("Translation"),
					attributes: {
						maxlength: 15
					},
					invalidMessage: _("The Russian word is required.")
				},
				{
					view: "combo",
					name: "PartOfSpeech",
					localId: "combo",
					label: _("Part Of Speech"),
					options: partsOfSpeech
				},
				{
					cols: [
						{},
						{
							view: "button",
							css: "webix_secondary",
							label: _("Cancel"),
							autowidth: true,
							click: () => {
								this.$$("form").clear();
								this.hideWindow();
							}
						},
						{
							view: "button",
							value: _("Save"),
							autowidth: true,
							hotkey: "enter",
							css: "webix_primary",
							click: () => {
								if (this.$$("form").validate()) {
									const values = this.$$("form").getValues();
									const id = this.getParam("id", true);
									const user = this.app.getService("user");
									const userId = user.getUser().id;
									values.GroupId = id;
									values.UserId = userId;
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
				labelWidth: 150
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
