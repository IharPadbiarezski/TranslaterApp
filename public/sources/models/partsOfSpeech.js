import {urls} from "../config/urls";

export const partsOfSpeech = new webix.DataCollection({
	url: urls.partsOfSpeech,
	save: `rest->${urls.partsOfSpeech}`
});
