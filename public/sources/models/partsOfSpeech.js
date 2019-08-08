// import {urls} from "../config/urls";

export const partsOfSpeech = new webix.DataCollection({
	data: [
		{
			id: "1",
			value: "Noun"
		},
		{
			id: "2",
			value: "Verb"
		},
		{
			id: "3",
			value: "Pronoun"
		},
		{
			id: "4",
			value: "Adverb"
		},
		{
			id: "5",
			value: "Adjective"
		},
		{
			id: "6",
			value: "Article"
		},
		{
			id: "7",
			value: "Interjection"
		},
		{
			id: "8",
			value: "Conjuction"
		},
		{
			id: "9",
			value: "Preposition"
		},
		{
			id: "10",
			value: "Number"
		}
	]
	// url: urls.wordsGroups,
	// save: `rest->${urls.wordsGroups}`
});
