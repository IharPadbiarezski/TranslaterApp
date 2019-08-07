import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const lang = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;
		const toolBar = {
			view: "toolbar",
			height: 56,
			elements: [
				{
					view: "label",
					label: _("Translator App"),
					css: "header__logo"
				},
				{},
				{
					view: "label",
					localId: "userGreeting"
				},
				{},
				{
					cols: [
						{
							view: "segmented",
							localId: "lang",
							options: [
								{id: "en", value: _("EN")},
								{id: "ru", value: _("RU")}
							],
							click: () => this.toggleLanguage(),
							value: lang
						},
						{
							view: "button",
							css: "webix_transparent",
							label: "Logout",
							autowidth: true,
							click: () => {
								// this.show("/logout");
							}
						}
					]
				}
			]
		};

		let menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "#value# ",
			data: [
				{value: _("Vocabulary"), id: "vocabulary"},
				{value: _("Tests"), id: "tests"},
				{value: _("Results"), id: "results"}
			]
		};

		let ui = {
			type: "clean",
			paddingX: 5,
			css: "app_layout",
			rows: [
				toolBar,
				{
					cols: [
						{
							paddingX: 5,
							paddingY: 10,
							rows: [menu]
						},
						{
							type: "wide",
							paddingY: 10,
							paddingX: 5,
							rows: [
								{$subview: true}
							]
						}
					]
				}
			]
		};

		return ui;
	}

	init() {
		this.use(plugins.Menu, "top:menu");

		this.$$("userGreeting").setValue("Hello, dear Igor!");
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("lang").getValue();
		langs.setLang(value);
	}
}
