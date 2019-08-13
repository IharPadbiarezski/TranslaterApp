import {JetView} from "webix-jet";
import SettingTestWindow from "./windows/settingTest";
import ResultWindow from "./windows/result";
import {resultsOfTests} from "../models/resultsOfTests";
import {urls} from "../config/urls";
import {partsOfSpeech} from "../models/partsOfSpeech";
import {additionWords} from "../models/additionWords";

export default class TestsView extends JetView {
	get categoryLabelId() {
		return "categoryLabel";
	}

	get questionWordLabelId() {
		return "questionWordLabel";
	}

	get questionNumberLabelId() {
		return "questionNumberLabel";
	}

	get answerButtonId1() {
		return "answerButton_1";
	}

	get answerButtonId2() {
		return "answerButton_2";
	}

	get answerButtonId3() {
		return "answerButton_3";
	}

	get answerButtonId4() {
		return "answerButton_4";
	}

	get scoreId() {
		return "score";
	}

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
					localId: this.categoryLabelId,
					align: "center",
					x: 0,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy test__label",
					view: "label",
					localId: this.questionWordLabelId,
					align: "center",
					x: 2,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy test--question__label",
					view: "label",
					localId: this.questionNumberLabelId,
					align: "center",
					x: 4,
					y: 0,
					dx: 2,
					dy: 1
				},
				{
					css: "boxy",
					view: "button",
					localId: this.answerButtonId1,
					click: () => this.processAnswer(`${this.answerButtonId1}`),
					x: 0,
					y: 1,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					localId: this.answerButtonId2,
					click: () => this.processAnswer(`${this.answerButtonId2}`),
					x: 3,
					y: 1,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					localId: this.answerButtonId3,
					click: () => this.processAnswer(`${this.answerButtonId3}`),
					x: 0,
					y: 3,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy",
					view: "button",
					localId: this.answerButtonId4,
					click: () => this.processAnswer(`${this.answerButtonId4}`),
					x: 3,
					y: 3,
					dx: 3,
					dy: 2
				},
				{
					css: "boxy test__template",
					localId: this.scoreId,
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
			this.$$(`${this.categoryLabelId}`).setValue(`${_("Category")}: ${groupName}`);
			this.dischargeParameters();
			this.showQuestion(groupName);
			this.setCurrentScore();
		});

		this.on(this.app, "test:startnewtest", () => {
			this.settingTestWindow.showWindow();
		});
	}

	processAnswer(buttonId) {
		const answer = this.$$(`${buttonId}`).getValue();
		this.checkAnswer(answer);
		this.showQuestion();
		if (this.questionNumber === this.questionsTotal) {
			this.resultWindow.showWindow({Result: this.score});
			this.setCurrentScore();
			this.saveResult(this.score);
		}
	}

	dischargeParameters() {
		this.score = 0;
		this.questionNumber = 0;
	}

	setCurrentScore() {
		this.$$(`${this.scoreId}`).setValues({Score: this.score});
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
		const user = this.app.getService("user");
		const currentUser = user.getUser().id;
		webix.ajax().post(`${urls.getOptions}?group=${this.groupId}&user=${currentUser}`, "", (response) => {
			const test = JSON.parse(response);
			const question = test.correctAnswer.English;
			this.PartOfSpeech = test.partOfSpeech;
			this.correctAnswer = test.correctAnswer.Russian;
			const correctAnswer = test.correctAnswer.Russian;
			this.$$(`${this.questionWordLabelId}`).setValue(question);
			const possibleAnswers = test.answers;
			const answersAmount = test.answers.length;

			const partOfSpeechWord = partsOfSpeech.getItem(test.partOfSpeech).value;
			if (partOfSpeechWord) {
				const auxiliaryWords = additionWords.filter(word => word.name === partOfSpeechWord);
				if (possibleAnswers < 3 && auxiliaryWords) {
					let difference = 3 - possibleAnswers;
					for (let i = 0; i < difference; i++) {
						possibleAnswers.push(auxiliaryWords[0].values[i]);
					}
				}
			}

			possibleAnswers.splice(Math.floor(Math.random() * answersAmount), 0, correctAnswer);
			for (let i = 0; i < possibleAnswers.length; i++) {
				this.$$(`answerButton_${i + 1}`).setValue(possibleAnswers[i]);
			}
			this.questionsTotal = 10;
			if (test.WordsAmount < 10) {
				this.questionsTotal = test.WordsAmount;
			}
			this.$$(`${this.questionNumberLabelId}`).setValue(`${this.questionNumber}/${this.questionsTotal}`);
		});
	}

	saveResult(score) {
		const myformat = webix.Date.dateToStr("%Y-%m-%d %H:%i:%s");
		const formatedCurrentDate = myformat(new Date());
		const user = this.app.getService("user");
		const userId = user.getUser().id;
		const resultOfTest = {
			TestDate: formatedCurrentDate,
			Result: score,
			GroupName: this.groupName,
			UserId: userId
		};
		resultsOfTests.add(resultOfTest);
	}
}
