import {JetView} from "webix-jet";
import {words} from "../../models/words";
import {partsOfSpeech} from "../../models/partsOfSpeech";

export default class WordWindow extends JetView {
	get formId() {
		return "form";
	}

	get comboId() {
		return "combo";
	}

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
			localId: this.formId,
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
					localId: this.comboId,
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
							click: () => this.addWord()
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

	getForm() {
		return this.$$(`${this.formId}`);
	}

	addWord() {
		const addWordForm = this.getForm();
		if (addWordForm.validate()) {
			const values = addWordForm.getValues();
			const id = this.getParam("id", true);
			const user = this.app.getService("user");
			const userId = user.getUser().id;
			values.GroupId = id;
			// Change User Id field after use User plugin
			values.UserId = "1";
			values.UserId = userId;
			words.add(values);
			addWordForm.clear();
			this.hideWindow();
		}
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
