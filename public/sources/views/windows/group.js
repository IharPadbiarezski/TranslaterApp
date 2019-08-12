import {JetView} from "webix-jet";
import {wordsGroups} from "../../models/wordsGroups";

export default class GroupWindow extends JetView {

	get formId() {
		return "form";
	}

	config() {
		const _ = this.app.getService("locale")._;
		const toolbar = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: _("Create Group")
				}
			]
		};

		const form = {
			view: "form",
			localId: this.formId,
			rows: [
				{
					view: "text",
					name: "Name",
					label: _("Name"),
					attributes: {
						maxlength: 15
					},
					labelWidth: 80,
					invalidMessage: _("The name word is required.")
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
								this.hideWindow();
							}
						},
						{
							view: "button",
							value: _("Save"),
							autowidth: true,
							hotkey: "enter",
							css: "webix_primary",
							click: () => this.addGroup()
						}
					]
				}
			],
			rules: {
				Name: webix.rules.isNotEmpty
			}
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

	addGroup() {
		const groupForm = this.$$(`${this.formId}`);
		if (groupForm.validate()) {
			const values = groupForm.getValues();
			values.Amount = 0;
			values.CreationDate = new Date();
			wordsGroups.add(values);
			groupForm.clear();
			this.hideWindow();
		}
	}

	showWindow() {
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
