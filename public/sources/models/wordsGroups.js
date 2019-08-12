import {urls} from "../config/urls";

export const wordsGroups = new webix.DataCollection({
	scheme: {
		$init: (obj) => { obj.value = obj.Name; }
	},
	url: urls.wordsGroups,
	save: `rest->${urls.wordsGroups}`
});
