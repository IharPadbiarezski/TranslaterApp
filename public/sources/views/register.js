import {JetView} from "webix-jet";
import {urls} from "../config/urls";

export default class RegisterForm extends JetView {
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

	get languageId() {
		return "lang";
	}

	config() {
		const _ = this.app.getService("locale")._;

		const registerHeader = {
			localId: this.registerHeaderId,
			type: "header",
			template: _("Register")
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
				registerHeader,
				registerForm,
				{}
			]
		};
	}

	init(view) {
		// this.hideElement(`${this.registerFormId}`);
		// this.hideElement(`${this.registerHeaderId}`);
		view.$view.querySelector("input").focus();
	}

	// getLoginForm() {
	// 	return this.$$(`${this.loginFormId}`);
	// }

	getRegisterForm() {
		return this.$$(`${this.registerFormId}`);
	}

	// onLogin() {
	// 	const form = this.getLoginForm();
	// 	let values = form.getValues();
	// 	this.doLogin(form, values);
	// }

	// doLogin(view, values) {
	// 	const user = this.app.getService("user");
	// 	const ui = this.$$(`${this.loginTopId}`);

	// 	if (view && view.validate()) {
	// 		user.login(values.name, values.password).catch(() => {
	// 			webix.html.removeCss(ui.$view, "invalid_login");
	// 			view.elements.password.focus();
	// 			webix.delay(() => {
	// 				webix.html.addCss(ui.$view, "invalid_login");
	// 			});
	// 		});
	// 	}
	// }

	onRegister() {
		const form = this.getRegisterForm();
		form.clearValidation();
		if (form.validate()) {
			this.doRegister();
		}
	}

	// showElement(elemId) {
	// 	this.$$(elemId).show();
	// }

	// hideElement(elemId) {
	// 	this.$$(elemId).hide();
	// }

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
}
