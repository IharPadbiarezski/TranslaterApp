import {JetView} from "webix-jet";
import {wordsGroups} from "../../models/wordsGroups";
import {urls} from "../../config/urls";

export default class SettingTestWindow extends JetView {
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
					label: _("Choose a Category"),
					align: "center"
				}
			]
		};

		const form = {
			view: "form",
			localId: this.formId,
			rows: [
				{
					view: "combo",
					name: "id",
					localId: this.comboId,
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
								const groupId = this.$$(`${this.formId}`).getValues().id;
								this.checkNumberOfWords(groupId);
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

	checkNumberOfWords(groupId) {
		webix.ajax().post(`${urls.getLengthOfAvailableWords}?group=${groupId}`, "", (response) => {
			const length = JSON.parse(response).Length;
			if (length > 3) {
				this.displayTestScreen(groupId);
			}
			else {
				const text = "Please, add more new words to the current category to start playing! Or try to choose another category!";
				webix.message({type: "error", text});
			}
		});
	}

	displayTestScreen(groupId) {
		const groupName = wordsGroups.getItem(groupId).Name;
		this.app.callEvent("test:showquestion", [groupName, groupId]);
		this.hideWindow();
	}

	showWindow() {
		wordsGroups.waitData.then(() => {
			const value = wordsGroups.getFirstId();
			if (value) {
				this.$$(`${this.comboId}`).setValue(value);
			}
		});
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
