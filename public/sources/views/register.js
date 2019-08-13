import {JetView} from "webix-jet";
import {urls} from "../config/urls";

export default class RegisterForm extends JetView {
	get registerHeaderId() {
		return "registerHeader";
	}

	get registerFormId() {
		return "registerForm";
	}

	get loginTopId() {
		return "loginTop";
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
			localId: this.loginTopId,
			rows: [
				registerHeader,
				registerForm,
				{}
			]
		};
	}

	init(view) {
		view.$view.querySelector("input").focus();
	}

	getRegisterForm() {
		return this.$$(`${this.registerFormId}`);
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
				registerForm.markInvalid("email", registerError);
			}
		});
	}
}
