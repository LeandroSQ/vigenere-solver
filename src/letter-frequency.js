// Imports
const fs = require("fs/promises");
const path = require("path");
const csv = require("csv");

// Constants
const CSV_FILE_PATH = path.join(__dirname, "../", "assets", "letter-frequency.csv");// Define the CSV file path
const CSV_PARSE_OPTIONS = {
	encoding: "utf-8",
	delimiter: ";",
	trim: true
};

// Exports
module.exports = class LetterFrequency {

	static #table = null;

	static load() {
		return new Promise(async (resolve, reject) => {
			const content = await fs.readFile(CSV_FILE_PATH, { encoding: "utf-8" });

			csv.parse(content, CSV_PARSE_OPTIONS, (error, records, info) => {
				if (error) return reject(error);

				// Fetch the headers of the CSV file
				const headers = records[0].map((x) => x.toUpperCase());
				headers.shift();// Removes the first element

				// Initializes the buffer
				const buffer = {};
				for (const language of headers) buffer[language] = { };

				// Map the rows into the buffer object
				for (let i = 1; i < records.length; i++) {
					// Fetches the entire row
					const row = records[i];

					// The first column will be the letter
					const letter = row[0].toUpperCase();

					// Map the letter with all the languages
					for (let j = 1; j < row.length; j++) {
						const language = headers[j - 1];
						const frequency = parseFloat(row[j]) / 100;

						buffer[language][letter] = frequency;
					}
				}

				this.#table = buffer;
				resolve(buffer);
			});
		});
	}

	static getLanguage(language) {
		return this.#table[language.toUpperCase()];
	}

	static getMostUsedLetterInLanguage(language) {
		const table = this.getLanguage(language);

		return Object.entries(table).sort(([, a], [, b]) => b - a)[0][0];
	}

};