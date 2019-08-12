import {JetView} from "webix-jet";
import {urls} from "../config/urls";

export default class LoginView extends JetView {
	get loginHeaderId() {
		return "loginHeader";
	}

	get registerHeaderId() {
		return "registerHeader";
	}

	get loginFormId() {
		return "loginForm";
	}

	get registerFormId() {
		return "registerForm";
	}

	get loginTopId() {
		return "loginTop";
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
						if (this.getRegisterForm()) {
							this.hideElement(`${this.registerFormId}`);
							this.hideElement(`${this.registerHeaderId}`);
							this.showElement(`${this.loginFormId}`);
							this.showElement(`${this.loginHeaderId}`);
						}
					}
				},
				{
					view: "button",
					css: "webix_transparent toolbar-login__element",
					label: _("Register"),
					autowidth: true,
					click: () => {
						if (this.getLoginForm()) {
							this.hideElement(`${this.loginFormId}`);
							this.hideElement(`${this.loginHeaderId}`);
							this.showElement(`${this.registerFormId}`);
							this.showElement(`${this.registerHeaderId}`);
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
		this.hideElement(`${this.registerFormId}`);
		this.hideElement(`${this.registerHeaderId}`);
		view.$view.querySelector("input").focus();
	}

	getLoginForm() {
		return this.$$(`${this.loginFormId}`);
	}

	getRegisterForm() {
		return this.$$(`${this.loginFormId}`);
	}

	onLogin() {
		const form = this.getLoginForm();
		let values = form.getValues();
		this.doLogin(form, values);
	}

	doLogin(view, values) {
		const user = this.app.getService("user");
		const ui = this.$$(`${this.loginTopId}`);

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

	onRegister() {
		const form = this.getRegisterForm();
		form.clearValidation();
		if (form.validate()) {
			this.doRegister();
		}
	}

	showElement(elemId) {
		this.$$(elemId).show();
	}

	hideElement(elemId) {
		this.$$(elemId).hide();
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
				registerForm.markInvalid("email", registerError);
			}
		});
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("lang").getValue();
		langs.setLang(value);
	}
}
