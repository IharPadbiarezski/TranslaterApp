import {JetView} from "webix-jet";
import SettingTestWindow from "./windows/settingTest";
import ResultWindow from "./windows/result";
import {resultsOfTests} from "../models/resultsOfTests";
import {urls} from "../config/urls";

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
							this.saveResult(this.score);
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
							this.saveResult(this.score);
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
							this.setCurrentScore();
							this.saveResult(this.score);
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
							this.setCurrentScore();
							this.saveResult(this.score);
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
							return `${_("Score")}: ${obj.Score}`;
						}
						return "";
					},
					x: 0,
					y: 5,
					dx: 6,
					dy: 1
				}
			]
		};
		return ui;
	}

	init() {
		const _ = this.app.getService("locale")._;
		this.settingTestWindow = this.ui(SettingTestWindow);
		this.resultWindow = this.ui(ResultWindow);
		this.settingTestWindow.showWindow();

		this.on(this.app, "test:showquestion", (groupName, groupId) => {
			this.groupName = groupName;
			this.groupId = groupId;
			this.$$("categoryLabel").setValue(`${_("Category")}: ${groupName}`);
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
			const idForNoun = "5d4c21467fa98d49d08e0c4a";
			const idForVerb = "5d4c21607fa98d49d08e0c4b";
			if (this.PartOfSpeech === idForNoun || this.PartOfSpeech === idForVerb) {
				this.score += 2;
			}
			else {
				++this.score;
			}
			this.setCurrentScore();
		}
		++this.questionNumber;
	}


	showQuestion() {
		webix.ajax().post(`${urls.getOptions}?group=${this.groupId}`, "", (response) => {
			const test = JSON.parse(response);
			const question = test.correctAnswer.English;
			this.PartOfSpeech = test.correctAnswer.PartOfSpeech;
			this.correctAnswer = test.correctAnswer.Russian;
			this.$$("label").setValue(question);
			const possibleAnswers = test.answers;
			possibleAnswers.splice(Math.floor(Math.random() * 4), 0, test.correctAnswer.Russian);
			for (let i = 0; i < possibleAnswers.length; i++) {
				this.$$(`answerButton_${i + 1}`).setValue(possibleAnswers[i]);
			}
			const questionsTotal = 10;
			this.$$("questionNumberLabel").setValue(`${this.questionNumber}/${questionsTotal}`);
		});
	}

	saveResult(score) {
		const myformat = webix.Date.dateToStr("%Y-%m-%d %H:%i:%s");
		const formatedCurrentDate = myformat(new Date());
		const user = this.app.getService("user");
		const userId = user.getUser().id;
		const result = {
			TestDate: formatedCurrentDate,
			Result: score,
			GroupName: this.groupName,
			UserId: userId
		};
		resultsOfTests.add(result);
	}
}
