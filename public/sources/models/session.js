import {urls} from "../config/urls";

let status = () => webix.ajax().post(urls.status)
	.then(a => a.json());

let login = (name, password) => webix.ajax().post(urls.login, {
	name, password
}).then(a => a.json());

let logout = () => webix.ajax().post(urls.logout)
	.then(a => a.json());

export default {
	status, login, logout
};
