import {JetView} from "webix-jet";
import {urls} from "../config/urls";

export default class LoginView extends JetView {
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
					css: "webix_transparent toolbar-login__element",
					label: _("Login"),
					autowidth: true,
					click: () => {
						if (this.$$("registerForm")) {
							this.hideElement("registerForm");
							this.hideElement("registerHeader");
							this.showElement("loginForm");
							this.showElement("loginHeader");
						}
					}
				},
				{
					view: "button",
					css: "webix_transparent toolbar-login__element",
					label: _("Register"),
					autowidth: true,
					click: () => {
						if (this.$$("loginForm")) {
							this.hideElement("loginForm");
							this.hideElement("loginHeader");
							this.showElement("registerForm");
							this.showElement("registerHeader");
						}
					}

				}
			]
		};

		const loginHeader = {
			localId: "loginHeader",
			type: "header",
			template: _("Login")
		};

		const registerHeader = {
			localId: "registerHeader",
			type: "header",
			template: _("Register")
		};

		const loginForm = {
			view: "form",
			localId: "loginForm",
			width: 600,
			borderless: false,
			margin: 10,
			rows: [
				{
					view: "text",
					name: "name",
					label: _("Name"),
					labelAlign: "right",
					invalidMessage: _("Incorrect name!"),
					attributes: {
						maxlength: 20
					}
				},
				{
					view: "text",
					type: "password",
					name: "password",
					label: _("Password"),
					labelAlign: "right"
				},
				{
					cols: [
						{
							view: "button",
							value: _("Login"),
							hotkey: "enter",
							autowidth: true,
							click: () => {
								const form = this.$$("loginForm");
								let values = form.getValues();
								this.doLogin(form, values);
							}
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			}
		};

		const registerForm = {
			view: "form",
			localId: "registerForm",
			width: 600,
			borderless: false,
			margin: 10,
			rows: [
				{
					view: "text",
					name: "name",
					label: _("Name"),
					labelAlign: "right",
					invalidMessage: _("The name is required."),
					attributes: {
						maxlength: 20
					}
				},
				{
					view: "text",
					name: "email",
					label: _("E-Mail Address"),
					labelAlign: "right"
				},
				{
					view: "text",
					type: "password",
					name: "password",
					label: _("Password"),
					labelAlign: "right",
					invalidMessage: _("The password confirmation does not match.")
				},
				{
					view: "text",
					type: "password",
					name: "passwordConf",
					label: _("Confirm Password"),
					labelAlign: "right"
				},
				{
					cols: [
						{
							view: "button",
							value: _("Register"),
							hotkey: "enter",
							autowidth: true,
							click: () => {
								const form = this.$$("registerForm");
								form.clearValidation();
								if (form.validate()) {
									this.doRegister();
								}
							}
						}
					]
				}
			],
			elementsConfig: {
				labelWidth: 150
			},
			rules: {
				name: webix.rules.isNotEmpty,
				password: (value) => {
					const passwordConf = this.$$("registerForm").getValues().passwordConf;
					return value === passwordConf && value.length > 0;
				}
			}
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
								{
									localId: "loginTop",
									rows: [
										registerHeader,
										registerForm,
										loginHeader,
										loginForm,
										{}
									]},
								{}
							]
						}
					]
				}
			]
		};
	}

	init(view) {
		this.hideElement("registerForm");
		this.hideElement("registerHeader");
		view.$view.querySelector("input").focus();
	}

	doLogin(view, values) {
		const user = this.app.getService("user");
		const ui = this.$$("loginTop");

		if (view && view.validate()) {
			user.login(values.name, values.password).catch(() => {
				webix.html.removeCss(ui.$view, "invalid_login");
				view.elements.password.focus();
				webix.delay(() => {
					webix.html.addCss(ui.$view, "invalid_login");
				});
			});
		}
	}

	showElement(elemId) {
		this.$$(elemId).show();
		this.$$(elemId).show();
	}

	hideElement(elemId) {
		this.$$(elemId).hide();
		this.$$(elemId).hide();
	}

	doRegister() {
		const values = this.$$("registerForm").getValues();
		values.date = new Date();
		webix.ajax().post(urls.register, values, (response) => {
			const registerError = JSON.parse(response).error;
			if (!registerError) {
				const user = this.app.getService("user");
				user.login(values.name, values.password);
			}
			else {
				this.$$("registerForm").markInvalid("email", registerError);
			}
		});
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("lang").getValue();
		langs.setLang(value);
	}
}
