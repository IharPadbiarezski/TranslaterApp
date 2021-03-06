import {JetView} from "webix-jet";
import {wordsGroups} from "../models/wordsGroups";
import {words} from "../models/words";
import GroupWindow from "./windows/group";

export default class VocabularyView extends JetView {
	get wordsGroupListId() {
		return "wordsGroupList";
	}

	config() {
		const _ = this.app.getService("locale")._;
		const wordsGroupsList = {
			view: "list",
			localId: this.wordsGroupListId,
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
					type: "icon",
					icon: "wxi-plus",
					label: _("Create Group"),
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
		const user = this.app.getService("user");
		const currentUser = user.getUser().id;
		this.groupWindow = this.ui(GroupWindow);
		wordsGroups.waitData.then(() => {
			wordsGroups.data.filter(result => result.UserId === currentUser);
			this.$$(`${this.wordsGroupListId}`).sync(wordsGroups);
			let id = this.getParam("id") || wordsGroups.getFirstId();
			if (id && wordsGroups.exists(id)) {
				this.$$(`${this.wordsGroupListId}`).select(id);
			}
			else {
				this.show("helperTemplate");
			}
		});
	}
}
