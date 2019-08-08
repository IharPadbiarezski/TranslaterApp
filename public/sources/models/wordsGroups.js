// import {urls} from "../config/urls";

export const wordsGroups = new webix.DataCollection({
	data: [
		{
			id: "1",
			Name: "Business",
			CreationDate: "2019-07-30 11:36:10",
			Amount: 1
		},
		{
			id: "2",
			Name: "Education",
			CreationDate: "2019-07-30 11:36:10",
			Amount: 1
		},
		{
			id: "3",
			Name: "Lifestyle",
			CreationDate: "2019-07-30 11:36:10",
			Amount: 2
		},
		{
			id: "4",
			Name: "Sport",
			CreationDate: "2019-07-30 11:36:10",
			Amount: 1
		}
	],
	scheme: {
		$init: (obj) => { obj.value = obj.Name; }
	}
	// url: urls.wordsGroups,
	// save: `rest->${urls.wordsGroups}`
});
