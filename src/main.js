// Imports
require("./extensions.js");
const path = require("path");
const fs = require("fs").promises;
const Friedman = require("./friedman.js");
const Vigenere = require("./vigenere.js");
const Benchmark = require("./benchmark.js");
const LetterFrequency = require("./letter-frequency.js");
const FrequencyAnalysis = require("./frequency-analysis.js");

// Constants
const LANGUAGE = "PORTUGUESE";

// Functions
async function readFile(file) {
	const benchmark = new Benchmark("read file");

	let content = await fs.readFile(file, { encoding: "utf-8" });
	content = content.toString().toUpperCase();

	benchmark.log();

	return content;
}

async function writeFile(file, content) {
	const benchmark = new Benchmark("write file");

	await fs.writeFile(file, content, { encoding: "utf-8" });

	benchmark.log();
}

async function main() {
	const benchmark = new Benchmark("main");

	// Define the file paths
	const inputFilePath = path.join(__dirname, "../", "tests", "cipher31.txt");
	const outputFilePath = path.join(__dirname, "../", "tests", path.basename(inputFilePath).replace(".txt", "-output.txt"));

	// Reads the file
	const input = await readFile(inputFilePath);

	// Loads all the letter frequency tables
	await LetterFrequency.load();

	// Estimates the key length using friedman test
	const keyLength = Friedman.estimateKeyLength(input, LANGUAGE);
	console.log(`Estimated key length: ${keyLength}`);

	// Guesses the key using frequency analysis
	const key = FrequencyAnalysis.guessKey(input, keyLength, LANGUAGE);
	console.log(`Key: ${key}`);

	// Decipher it with the guessed key
	const output = Vigenere.decipher(input, key);

	// Write the deciphered text to the output file
	await writeFile(outputFilePath, output);

	benchmark.log();
}

main();