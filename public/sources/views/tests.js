import {JetView} from "webix-jet";
import SettingTestWindow from "./windows/settingTest";
import ResultWindow from "./windows/result";

export default class TestsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		let ui = {
			view: "gridlayout",
			gridColumns: 6,
			gridRows: 6,
			cells: [
				{
					css: "boxy test--category__label",
					view: "label",
					localId: "categoryLabel",
					align: "center",
					x: 0,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy test__label",
					view: "label",
					localId: "label",
					align: "center",
					x: 2,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy test--question__label",
					view: "label",
					localId: "questionNumberLabel",
					align: "center",
					x: 4,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy",
					view: "button",
					localId: "answerButton_1",
					click: () => {
						const answer = this.$$("answerButton_1").getValue();
						this.checkAnswer(answer);
						this.showQuestion();
						if (this.questionNumber === 10) {
							this.resultWindow.showWindow({Result: this.score});
							this.setCurrentScore();
						}
					},
					x: 0,
					y: 1,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					localId: "answerButton_2",
					click: () => {
						const answer = this.$$("answerButton_2").getValue();
						this.checkAnswer(answer);
						this.showQuestion();
						if (this.questionNumber === 10) {
							this.resultWindow.showWindow({Result: this.score});
							this.setCurrentScore();
						}
					},
					x: 3,
					y: 1,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					localId: "answerButton_3",
					click: () => {
						const answer = this.$$("answerButton_3").getValue();
						this.checkAnswer(answer);
						this.showQuestion();
						if (this.questionNumber === 10) {
							this.resultWindow.showWindow({Result: this.score});
						}
					},
					x: 0,
					y: 3,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					localId: "answerButton_4",
					click: () => {
						const answer = this.$$("answerButton_4").getValue();
						this.checkAnswer(answer);
						this.showQuestion();
						if (this.questionNumber === 10) {
							this.resultWindow.showWindow({Result: this.score});
						}
					},
					x: 3,
					y: 3,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy test__template",
					localId: "score",
					template: (obj) => {
						if (obj.Score || obj.Score === 0) {
							return `Score: ${obj.Score}`;
						}
						return "";
					},
					x: 0,
					y: 5,
					dx: 6,
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
		this.settingTestWindow = this.ui(SettingTestWindow);
		this.resultWindow = this.ui(ResultWindow);
		this.settingTestWindow.showWindow();

		this.on(this.app, "test:showquestion", (groupName, id) => {
			this.$$("categoryLabel").setValue(`Category: ${groupName}`);
			this.dischargeParameters();
			this.showQuestion(groupName);
			this.setCurrentScore();
		});

		this.on(this.app, "test:startnewtest", () => {
			this.settingTestWindow.showWindow();
		});
	}

	dischargeParameters() {
		this.score = 0;
		this.questionNumber = 0;
	}

	setCurrentScore() {
		this.$$("score").setValues({Score: this.score});
	}

	checkAnswer(userAnswer) {
		if (userAnswer === this.correctAnswer) {
			if (this.questionWord.PartOfSpeech === "Noun" || this.questionWord.PartOfSpeech === "Verb") {
				this.score += 2;
			}
			else {
				++this.score;
			}
			this.setCurrentScore();
		}
		++this.questionNumber;
	}

	makeRequest() {

	}

	showQuestion() {
		// Here would be ajax request and every time is called the app get new object
		let possibleAnswers = ["Стол", "Стул", "Дверь"];
		this.questionWord = {English: "Car", Russian: "Авто", PartOfSpeech: "Noun"};
		const question = this.questionWord.English;
		this.correctAnswer = this.questionWord.Russian;
		this.$$("label").setValue(question);
		possibleAnswers.splice(Math.floor(Math.random() * 4), 0, this.questionWord.Russian);
		for (let i = 0; i < possibleAnswers.length; i++) {
			this.$$(`answerButton_${i + 1}`).setValue(possibleAnswers[i]);
		}
		const questionsTotal = 10;
		this.$$("questionNumberLabel").setValue(`${this.questionNumber}/${questionsTotal}`);
	}
}
