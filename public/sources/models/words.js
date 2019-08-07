// import {urls} from "../config/urls";

export const words = new webix.DataCollection({
	data: [
		{
			id: "1",
			Russian: "Бизнесс",
			English: "Business",
			GroupId: "1",
			PartsOfSpeech: "1",
			UserId: "1"
		},
		{
			id: "2",
			Russian: "Образование",
			English: "Education",
			GroupId: "2",
			PartsOfSpeech: "1",
			UserId: "1"
		},
		{
			id: "3",
			Russian: "Образ жизни",
			English: "Lifestyle",
			GroupId: "3",
			PartsOfSpeech: "1",
			UserId: "1"
		},
		{
			id: "4",
			Russian: "Спорт",
			English: "Sport",
			GroupId: "4",
			PartsOfSpeech: "1",
			UserId: "1"
		},
		{
			id: "5",
			Russian: "Бежать",
			English: "To run",
			GroupId: "3",
			PartsOfSpeech: "2",
			UserId: "1"
		}
	]
	// url: urls.wordsGroups,
	// save: `rest->${urls.wordsGroups}`
});