import {JetView} from "webix-jet";

export default class TestsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		let ui = {
			view: "gridlayout",
			gridColumns: 2,
			gridRows: 6,
			cells: [
				{
					css: "boxy test__label",
					view: "label",
					localId: "label",
					label: "Label",
					align: "center",
					x: 0,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy",
					view: "button",
					label: "Hello",
					localId: "answerButton_1",
					// click: () => {
					// 	const answer = this.getRoot().queryView({view: "button"}).getValue();
					// 	console.log(answer)
					// 	this.checkAnswer(answer);
					// 	this.showQuestion();
					// },
					x: 0,
					y: 1,
					dx: 1,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					label: "Hello2",
					localId: "answerButton_2",
					// click: function() {
					// 	const answer = this.getValue();
					// 	console.log(answer)
					// 	this.$scope.checkAnswer(answer);
					// 	this.$scope.showQuestion();
					// },
					x: 1,
					y: 1,
					dx: 1,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					label: "Hello3",
					localId: "answerButton_3",
					// click: () => {
					// 	const answer = this.getRoot().queryView({view: "button"}).getValue();
					// 	console.log(answer)
					// 	this.checkAnswer(answer);
					// 	this.showQuestion();
					// },
					x: 0,
					y: 3,
					dx: 1,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					label: "Hello4",
					localId: "answerButton_4",
					// click: () => {
					// 	const answer = this.getRoot().queryView({view: "button"}).getValue();
					// 	console.log(answer)
					// 	this.checkAnswer(answer);
					// 	this.showQuestion();
					// },
					x: 1,
					y: 3,
					dx: 1,
					dy: 2
				},
				{
					css: "boxy test__template",
					localId: "score",
					template: obj => `Score: ${obj.score || 0}`,
					x: 0,
					y: 5,
					dx: 2,
					dy: 1
				}
				// {
				// 	css: "boxy webix_danger",
				// 	view: "button",
				// 	label: "Check",
				// 	x: 1,
				// 	y: 5,
				// 	dx: 1,
				// 	dy: 1
				// }
			]
		};
		return ui;
	}

	init() {
		this.score = 0;
		this.showQuestion();


		this.getButtonValue();
		// this.$$("answerButton_1").attachEvent("onItemClick", () => {
		// 	console.log(this.$$("answerButton_1").getValue())
		// });
	}

	getButtonValue() {
		const buttons = [this.$$("answerButton_1"), this.$$("answerButton_2"), this.$$("answerButton_3"), this.$$("answerButton_4")];

		buttons.forEach((button) => {
			button.attachEvent("onItemClick", () => {
				const userAnswer = button.getValue();
				this.checkAnswer(userAnswer);
				this.showQuestion();
			});
		});
	}

	checkAnswer(answer) {
		if (answer === "Меня") {
			++this.score;
			this.$$("score").setValues({score: this.score});
		}
	}

	showQuestion() {
		let possibleAnswers = ["Ботвы", "Ку", "До"];
		const correctAnswer = "Меня";
		const question = "Mine";
		this.$$("label").setValue(question);
		possibleAnswers.splice(Math.floor(Math.random() * 4), 0, correctAnswer);
		for (let i = 0; i < possibleAnswers.length; i++) {
			this.$$(`answerButton_${i + 1}`).setValue(possibleAnswers[i]);
		}
	}
}
