// Imports

// Constants
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LANGUAGE_IC = {
	"ENGLISH": 0.06653846153846153,
	"FRENCH": 0.0776923076923077,
	"GERMAN": 0.07884615384615384,
	"ITALIAN": 0.07461538461538461,
	"PORTUGUESE": 0.07461538461538461,
	"RUSSIAN": 0.06769230769230769,
	"SPANISH": 0.07461538461538461,
	"RANDOM": 0.038461538461538464,
};

// Exports
module.exports = class CoincidenceIndex {

	static calculate(input) {
		// IoC(letter) = sum[letterOccurrenceCount * (letterOccurrenceCount - 1)] / (totalNumberOfLetters * (totalNumberOfLetters - 1))

		// Calculate the occurrences of each and every letter in the input text
		const occurrences = {};
		for (let i = 0; i < input.length; i++) {
			const letter = input[i];

			occurrences[letter] = (occurrences[letter] || 0) + 1;
		}

		// Calculate each and every letter incidence, and sum them
		let summation = 0;
		for (const letter of ALPHABET) {
			if (!occurrences.hasOwnProperty(letter)) continue;

			const occurrenceCount = occurrences[letter];
			const letterIncidence = (occurrenceCount * (occurrenceCount - 1));

			summation += letterIncidence;
		}

		// Calculate the index of coincidence
		const IoC = summation / (input.length * (input.length - 1));

		return IoC;
	}

	static getLanguageIndexOfCoincidence(language) {
		return LANGUAGE_IC[language.toUpperCase()];
	}

};