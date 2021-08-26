// Imports
const Benchmark = require("./benchmark");
const CoincidenceIndex = require("./coincidence-index");

// Constants
const MAX_KEY_LENGTH = 14;

// Exports
module.exports = class Friedman {

	static calculateDistance(x, from) {
		return Math.abs(x - from);
	}

	static estimateKeyLength(input, language) {
		const benchmark = new Benchmark("estimate key length");

		const languageIoC = CoincidenceIndex.getLanguageIndexOfCoincidence(language);
		const randomIoC = CoincidenceIndex.getLanguageIndexOfCoincidence("RANDOM");

		const possibleLengths = [];

		for (let m = 1; m < MAX_KEY_LENGTH; m++) {
			// Mount a string with every nth char at the input
			// Ex: xab xcd xde = xxx
			const arrayBuffer = [];

			for (let j = 0; j < input.length; j += m) arrayBuffer.push(input[j]);

			// Calculate the index of coincidence of the given buffer
			const ioc = CoincidenceIndex.calculate(arrayBuffer.join(""));

			// Calculate the distance to the target language
			const distanceToLanguageIoC = languageIoC - ioc;
			const distanceToRandomIoC = this.calculateDistance(ioc, randomIoC);

			// If a better fit, add to the possible lengths list
			if (distanceToLanguageIoC < distanceToRandomIoC) {
				possibleLengths.push({ length: m, ioc });
			}

		}

		benchmark.log();

		// Return the possible length with most IoC
		let maxIoC = null;
		let maxLength = -1;
		for (let i = 0; i < possibleLengths.length; i++) {
			if (!maxIoC || possibleLengths[i] > maxIoC) {
				maxIoC = possibleLengths[i].ioc;
				maxLength = possibleLengths[i].length;
			}
		}

		return maxLength;
	}

};