import {JetView} from "webix-jet";
import {wordsGroups} from "../models/wordsGroups";
import {words} from "../models/words";
import GroupWindow from "./windows/group";

export default class VocabularyView extends JetView {
	config() {
		const wordsGroupsList = {
			view: "list",
			localId: "wordsGroupList",
			padding: "0",
			borderless: true,
			scroll: "auto",
			width: 250,
			select: true,
			template: "#Name#",
			on: {
				onAfterSelect: (id) => {
					this.setParam("id", id);
					this.show("words");
					words.waitData.then(() => {
						words.data.filter(item => item.GroupId === id);
					});
				}
			}
		};
		const createGroupButton = {
			view: "toolbar",
			borderless: true,
			rows: [
				{
					view: "button",
					label: "+ Create Group",
					localId: "createGroupButton",
					autoheight: true,
					css: "webix_primary",
					click: () => {
						this.groupWindow.showWindow();
					}
				}
			]
		};

		return {
			cols: [
				{
					rows: [
						wordsGroupsList,
						createGroupButton
					]
				},
				{
					$subview: true
				}
			]
		};
	}

	init() {
		this.$$("wordsGroupList").sync(wordsGroups);
		this.groupWindow = this.ui(GroupWindow);
		wordsGroups.waitData.then(() => {
			let id = this.getParam("id") || wordsGroups.getFirstId();
			if (id && wordsGroups.exists(id)) {
				this.$$("wordsGroupList").select(id);
			}
			else {
				this.show("helperTemplate");
			}
		});
	}
}
