import {JetView} from "webix-jet";
import {wordsGroups} from "../../models/wordsGroups";

export default class SettingTestWindow extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const toolbar = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: _("Choose a Category"),
					align: "center"
				}
			]
		};

		const form = {
			view: "form",
			localId: "form",
			rows: [
				{
					view: "combo",
					name: "id",
					localId: "combo",
					options: wordsGroups
				},
				{
					cols: [
						{
							view: "button",
							css: "webix_danger",
							label: _("Go To Vocabulary"),
							click: () => {
								this.hideWindow();
								this.show("vocabulary");
							}
						},
						{
							view: "button",
							value: _("Start Test"),
							hotkey: "enter",
							css: "webix_primary",
							click: () => {
								const groupId = this.$$("form").getValues().id;
								const groupName = wordsGroups.getItem(groupId).Name;
								this.app.callEvent("test:showquestion", [groupName, groupId]);
								this.hideWindow();
							}
						},
						{
							view: "button",
							css: "webix_danger",
							label: _("Go To Results"),
							click: () => {
								this.hideWindow();
								this.show("results");
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
				width: 600,
				rows: [
					toolbar,
					form
				]
			}
		};
	}

	showWindow() {
		wordsGroups.waitData.then(() => {
			const value = wordsGroups.getFirstId();
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
