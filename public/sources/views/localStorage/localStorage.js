export default class Storage {
	static saveResultOfTestIntoLocalStorage(resultOfTest) {
		let resultsOfTests = this.getResultsOfTestsFromLocalStorage();
		resultsOfTests.push(resultOfTest);
		localStorage.setItem("resultsOfTests", JSON.stringify(resultsOfTests));
	}

	static getResultsOfTestsFromLocalStorage() {
		if (localStorage.getItem("resultsOfTests") === null) {
			return [];
		}
		return JSON.parse(localStorage.getItem("resultsOfTests"));
	}

	static removeResultOfTestLocalStorage(id) {
		let resultsOfTests = this.getResultsOfTestsFromStorage();
		resultsOfTests.filter(resultOfTest => resultOfTest.id !== id);
		localStorage.setItem("resultsOfTests", JSON.stringify(resultsOfTests));
	}

	static clearLocalStorage() {
		localStorage.clear();
	}
}
