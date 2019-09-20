import {urls} from "../config/urls";

export const resultsOfTests = new webix.DataCollection({
	url: urls.resultsOfTests,
	save: `rest->${urls.resultsOfTests}`
});
