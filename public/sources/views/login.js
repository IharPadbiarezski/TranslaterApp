import {JetView} from "webix-jet";

export default class LoginView extends JetView {
	get languageId() {
		return "lang";
	}

	config() {
		const lang = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;
		const toolBar = {
			view: "toolbar",
			height: 56,
			css: "toolbar-login__bg",
			cols: [
				{
					view: "label",
					label: _("Translator App"),
					css: "header__logo"
				},
				{},
				{
					view: "segmented",
					localId: this.languageId,
					options: [
						{id: "en", value: _("EN")},
						{id: "ru", value: _("RU")}
					],
					click: () => this.toggleLanguage(),
					value: lang
				},
				{
					view: "button",
					css: "webix_transparent toolbar-login__element",
					label: _("Login"),
					autowidth: true,
					click: () => {
						this.show("signin");
					}
				},
				{
					view: "button",
					css: "webix_transparent toolbar-login__element",
					label: _("Register"),
					autowidth: true,
					click: () => {
						this.show("register");
					}

				}
			]
		};

		return {
			rows: [
				toolBar,
				{
					rows: [
						{gravity: 0.2},
						{
							cols: [
								{},
								{$subview: true},
								{}
							]
						}
					]
				}
			]
		};
	}

	init() {
		this.show("signin");
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$(`${this.languageId}`).getValue();
		langs.setLang(value);
	}
}
