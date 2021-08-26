// Imports
const Benchmark = require("./benchmark.js");

// Constants

// Exports
module.exports = class Vigenere {

	static cipher(input, key) {
		const benchmark = new Benchmark("cipher");
		let buffer = "";

		for (let i = 0; i < input.length; i++) {
			let position = (input[i].toAscii() + key[i % key.length].toAscii()) % 26;

			position += "A".toAscii();

			buffer += String.fromAscii(position);
		}

		benchmark.log();

		return buffer;
	}

	static decipher(input, key) {
		const benchmark = new Benchmark("decipher");

		const buffer = [];
		const letterA = "A".toAscii();

		for (let i = 0; i < input.length; i++) {
			const letter = ((input.charCodeAt(i) - key.charCodeAt(i % key.length) + 26) % 26 + letterA).fromAscii();
			buffer.push(letter);
		}

		const result = buffer.join("");

		benchmark.log();

		return result;
	}

};