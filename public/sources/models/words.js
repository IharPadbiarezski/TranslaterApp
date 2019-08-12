import {urls} from "../config/urls";

export const words = new webix.DataCollection({
	url: urls.words,
	save: `rest->${urls.words}`
});
