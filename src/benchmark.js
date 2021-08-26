// Imports
const { performance } = require("perf_hooks");

// Constants
const ENABLED = true;

// Exports
module.exports = class Benchmark {

	constructor(name) {
		this.name = name;
		this.start = this.mark();
	}

	elapsed() {
		return this.mark() - this.start;
	}

	log() {
		if (ENABLED) console.log(`Elapsed ${this.name}: ${this.elapsed().toFixed(2)}ms`);
	}

	mark() {
		return performance.now();
	}
};