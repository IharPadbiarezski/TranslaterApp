import {JetView} from "webix-jet";

export default class LoginForm extends JetView {
	get loginHeaderId() {
		return "loginHeader";
	}

	get loginFormId() {
		return "loginForm";
	}

	get loginTopId() {
		return "loginTop";
	}

	config() {
		const _ = this.app.getService("locale")._;

		const loginHeader = {
			localId: this.loginHeaderId,
			type: "header",
			template: _("Login")
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

		return {
			localId: this.loginTopId,
			rows: [
				loginHeader,
				loginForm,
				{}
			]
		};
	}

	init(view) {
		view.$view.querySelector("input").focus();
	}

	getLoginForm() {
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
}
