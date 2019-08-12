import {JetView} from "webix-jet";
import {urls} from "../config/urls";

export default class LoginView extends JetView {
	get languageId() {
		return "lang";
	}

	get loginHeaderId() {
		return "loginHeader";
	}

	get loginFormId() {
		return "loginForm";
	}

	get loginTopId() {
		return "loginTop";
	}

	get registerHeaderId() {
		return "registerHeader";
	}

	get registerFormId() {
		return "registerForm";
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
			localId: this.loginHeaderId,
			type: "header",
			template: _("Login")
		};

		const registerHeader = {
			localId: this.registerHeaderId,
			type: "header",
			template: _("Register")
		};

		const loginForm = {
			view: "form",
			localId: this.loginFormId,
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
							click: () => this.onLogin()
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
			localId: this.registerFormId,
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
							click: () => this.onRegister()
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
					const passwordConf = this.getRegisterForm().getValues().passwordConf;
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
									localId: this.loginTopId,
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

	getLoginForm() {
		return this.$$(`${this.loginFormId}`);
	}

	getRegisterForm() {
		return this.$$(`${this.registerFormId}`);
	}

	onLogin() {
		const form = this.getLoginForm();
		let values = form.getValues();
		this.doLogin(form, values);
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

	onRegister() {
		const form = this.getRegisterForm();
		form.clearValidation();
		if (form.validate()) {
			this.doRegister();
		}
	}

	doRegister() {
		const registerForm = this.getRegisterForm();
		const values = registerForm.getValues();
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
		const value = this.$$(`${this.languageId}`).getValue();
		langs.setLang(value);
	}
}
