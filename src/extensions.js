// Imports

// Constants

// Exports
String.prototype.toAscii = function() {
	return this.charCodeAt(0);
};

String.fromAscii = function(ascii) {
	return String.fromCharCode(ascii);
};

Number.prototype.fromAscii = function() {
	return String.fromCharCode(this);
};