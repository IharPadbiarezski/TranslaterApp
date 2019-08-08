import {JetView} from "webix-jet";

export default class ResultWindow extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const toolbarTop = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: "Your Result",
					align: "center"
				}
			]
		};

		const toolbarButtom = {
			view: "toolbar",
			height: 50,
			elements: [
				{
					view: "button",
					css: "webix_danger",
					label: "Go To Words",
					click: () => {
						this.hideWindow();
						this.show("vocabulary");
					}
				},
				{
					view: "button",
					value: "Start Again",
					hotkey: "enter",
					css: "webix_primary",
					click: () => {
						this.app.callEvent("test:startnewtest");
						this.hideWindow();
					}
				},
				{
					view: "button",
					css: "webix_danger",
					label: "Go To Results",
					click: () => {
						this.hideWindow();
						this.show("results");
					}
				}
			]
		};

		const template = {
			localId: "template",
			css: "result__template",
			template: obj => obj.Result
		};

		return {
			view: "window",
			head: false,
			position: "center",
			modal: true,
			body: {
				width: 600,
				rows: [
					toolbarTop,
					template,
					toolbarButtom
				]
			}
		};
	}

	showWindow(values) {
		this.$$("template").setValues(values);
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}
}
