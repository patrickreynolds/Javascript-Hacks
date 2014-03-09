var empty_object = {};

var stooge = {
	"first-name" : "Jerome",
	"last-name"	 : "Howard"
};

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-23 10:42",
		city :"Los Angeles"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};

// Retrieval
stooge["first-name"]	// "Joe"
flight.departure.IATA 	// "SYD"

stooge["middle-name"] 	// undefined
flight.status 			// undefined

// || used for default values
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

// Throws undefined
flight.equipment 	// undefined
flight.equipment.model 	// throw "TypeError"

// Updating
stooge['first-name'] = 'Jerome';
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';

flight.equipment = {
	model: 'Boeing 777'
};
flight.status = 'overdue';


// Objects are always passed by reference
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
// nick is 'Curly' because x and stooge are references to the same object

var a = {}, b = {}, c = {};
// a, b, and c each refer to a different empty object.

a = b = c = {};
// a, b, c all refer to the same empty object

// Prototype
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

// Reflection
typeof flight.number	// 'number'
typeof flight.status	// 'string'
typeof flight.arrival	// 'object'
typeof flight.manifest 	// 'undefined'

typeof flight.toString 	// 'function'
typeof flight.constructor // 'function'

// Enumeration

// For - In
var name;
for (name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		document.writeln(name + ': ' + another_stooge[name]);
	};
}

// Classic For
var i;
var properties = [
	'first-name', 
	'middle-name',
	'last-name',
	'profession'
];

for (i = 0; i < properties.length; i += 1) {
	document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}

// Delete
another_stooge.nickname		// 'Moe'
delete another_stooge.nickname;


// Working with Global Variables

var MYAPP = {};

// This varible then becomes the container for your application

MYAPP.stooge = {
	"first-name": "Joe",
	"last-name": "Howard"
};

MYAPP.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};
