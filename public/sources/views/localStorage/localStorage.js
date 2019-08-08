export default class Storage {
	static saveIntoStorage(result) {
		let results = this.getResultsFromStorage();
		results.push(result);
		localStorage.setItem("results", JSON.stringify(results));
	}

	static getResultsFromStorage() {
		let results;
		if (localStorage.getItem("results") === null) {
			results = [];
		}
		else {
			results = JSON.parse(localStorage.getItem("results"));
		}
		return results;
	}

	static removeResultLocalStorage(id) {
		let resultsLS = this.getresultsFromStorage();
		resultsLS.forEach((resultLS, index) => {
			if (resultLS.id === id) {
				resultsLS.splice(index, 1);
			}
		});
		localStorage.setItem("results", JSON.stringify(resultsLS));
	}

	static clearLocalStorage() {
		localStorage.clear();
	}
}
