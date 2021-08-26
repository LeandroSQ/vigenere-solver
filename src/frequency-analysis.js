// Imports

const Benchmark = require("./benchmark");
const LetterFrequency = require("./letter-frequency");

// Constants
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Exports
module.exports = class FrequencyAnalysis {

	static estimateLetterForRow(input, language) {
		// let benchmark = new Benchmark(`estimate letter for row`);

		// Count every letter occurrence in the given input
		const occurrences = { };
		for (let i = 0; i < input.length; i++) {
			const letter = input[i];

			occurrences[letter] = (occurrences[letter] || 0) + 1;
		}

		// Gets the letter frequency of the given language
		const languageFrequency = LetterFrequency.getLanguage(language);

		// Calculate the chi-squared-distribution for every possible letter
		const chiSquaredDictionary = {};
		for (let i = 0; i < ALPHABET.length; i++) {
			let chiSquared = 0;

			for (const key in languageFrequency) {
				if (!languageFrequency.hasOwnProperty(key)) continue;

				// Calculate the shifted letter
				const letterIndex = (Math.abs("A".toAscii() - key.toAscii()) + i) % 26;
				const letter = ALPHABET[letterIndex];

				// Ignore unused letters
				if (!occurrences.hasOwnProperty(letter)) continue;

				// Calculate the letter frequency
				const observedFrequency = occurrences[letter];
				const expectedFrequency = languageFrequency[key] * input.length;
				// Calculate the chi-squared-distribution
				chiSquared += Math.pow(observedFrequency - expectedFrequency, 2) / expectedFrequency;
			}

			// Maps the chi-squared of the distributed letter
			chiSquaredDictionary[ALPHABET[i]] = chiSquared;
		}

		// Sorts the dictionary for the minimum value
		const least = Object.entries(chiSquaredDictionary)
			.sort(([, a], [, b]) => a - b)
			.map((x) => x[0])[0];

		// benchmark.log();

		return least;
	}

	static guessKey(input, keyLength, language) {
		const benchmark = new Benchmark("guess key");

		// Creates a 2d Grid to separate the input in given KeyLength chunks
		const grid = [];
		for (let i = 0; i < keyLength; i++) grid.push([]);

		// Distribute the input characters throughout the grid
		for (let i = 0; i < input.length; i++) {
			const column = i % keyLength;

			grid[column].push(input[i]);
		}

		// Estimate the key letter for each row
		let key = "";
		for (let i = 0; i < keyLength; i++) {
			const row = grid[i];
			const letter = this.estimateLetterForRow(row, language);

			key += letter;
		}

		benchmark.log();

		return key;
	}

};