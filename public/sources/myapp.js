import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";
import "./styles/app.css";
// import session from "./models/session";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/top/vocabulary"
		};

		super({...defaults, ...config});

		// this.use(plugins.User, {model: session});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => {
		let app = new MyApp();
		app.render();
		app.attachEvent("app:error:resolve", () => {
			webix.delay(() => app.show("/top/login"));
		});
		app.use(plugins.Locale, {
			webix: {
				en: "en-US",
				ru: "ru-RU"
			}
		});
	});
}
