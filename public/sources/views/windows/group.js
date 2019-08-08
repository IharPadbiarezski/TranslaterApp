import {JetView} from "webix-jet";
import {wordsGroups} from "../../models/wordsGroups";

export default class GroupWindow extends JetView {
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
			localId: "form",
			rows: [
				{
					view: "text",
					name: "Name",
					label: _("Name"),
					attributes: {
						maxlength: 15
					},
					labelWidth: 80,
					invalidMessage: "The name word is required."
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
							click: () => {
								if (this.$$("form").validate()) {
									const values = this.$$("form").getValues();
									values.Amount = 0;
									values.CreationDate = new Date();
									wordsGroups.add(values);
									this.$$("form").clear();
									this.hideWindow();
								}
							}
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

	showWindow() {
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
