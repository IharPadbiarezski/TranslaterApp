import {JetView} from "webix-jet";
import {words} from "../models/words";
import WordWindow from "./windows/word";
import {partsOfSpeech} from "../models/partsOfSpeech";

export default class VocabularyTable extends JetView {

	get datatableId() {
		return "table";
	}

	config() {
		const _ = this.app.getService("locale")._;
		const table = {
			view: "datatable",
			localId: this.datatableId,
			scroll: true,
			columns: [
				{
					id: "English",
					header: _("Original"),
					fillspace: true
				},
				{
					id: "Russian",
					header: _("Translation"),
					fillspace: true
				},
				{
					id: "PartOfSpeech",
					header: _("Part of Speech"),
					options: partsOfSpeech,
					fillspace: true
				}
			]
		};

		const addWordButton = {
			view: "toolbar",
			borderless: true,
			elements: [
				{},
				{
					view: "button",
					label: _("Export to Excel"),
					css: "webix_secondary",
					autowidth: true,
					click: () => {
						webix.toExcel(this.getDatatable(), {
							filename: "words",
							name: "Words",
							columns: {
								English: {header: "Original", width: 200},
								Russian: {header: "Translation", width: 200},
								PartOfSpeech: {header: "Part Of Speech", width: 200}
							}
						});
					}
				},
				{
					view: "button",
					type: "icon",
					icon: "wxi-plus",
					label: _("Add Word"),
					autowidth: true,
					css: "webix_primary",
					click: () => {
						this.wordWindow.showWindow();
					}
				}
			]
		};

		return {
			rows: [
				table,
				addWordButton
			]
		};
	}

	init() {
		this.getDatatable().sync(words);
		this.wordWindow = this.ui(WordWindow);
	}

	getDatatable() {
		return this.$$(`${this.datatableId}`)
	}
}
