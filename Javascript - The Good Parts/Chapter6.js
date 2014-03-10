// Javascript: The Good Parts - Chapter 6

// Arrays

var empty = [];
var numbers = [
		'zero', 'one', 'two', 'three', 'four', 
		'five', 'six', 'seven', 'eight', 'nine'
];

empty[1]		// undefined
numbers[1]		// 'one'

empty.length	// 0
numbers.length 	// 10

// Object literal
var numbers_object = {
	'0': 'zero', '1': 'one', '2': 'two',
	'3': 'three', '4': 'four', '5': 'five',
	'6': 'six', '7': 'seven', '8': 'eight',
	'9': 'nine'
};


// Length

var myArray = [];
myArray.length 		// 0

myArray[1000000] = true;
myArray.length 		// 10000001
// My array contains one property

numbers.length = 3;
// numbers is ['zero', 'one', 'two']

numbers[numbers.length] = 'shi';
// numbers is ['zero', 'one', 'two', 'shi']

numbers.push('go');
// numbers is ['zero', 'one', 'two', 'shi', 'go']

// Delete
delete numbers[2];
// numbers is ['zero', 'one', undefined, 'shi', 'go']

numbers.splice(2, 1);
// numbers is ['zero', 'one', 'shi', 'go']


// Confusion

// detecting difference between arrays and objects
var is_array = function (value) {
	return value && 
		typeof value === 'object' &&
		value.constructor === Array;
};

var is_array = function (value) {
	return value &&									// if its true
		typeof value === 'object' &&				// if it is type object true for objects, arrays, and *null
		typeof value.length === 'number' &&			// if the value has a length property that is a number
		typeof value.splice === 'function' &&		// does the value contain a splice method
		!(value.propertyIsEnumerable('length'));	// is the length property enumerable
};


// Array Methods

// Adding array method
Array.method('reduce', function (f, value) {
	var i;
	for (i = 0; i < this.length; i += 1) {
		value = f(this[i], value);
	}
	return value;
});

// New adding array method
var data = [4, 8, 15, 16, 23, 42];

// Define two simple functions. One will add two
// numbers. The other will multiply two numbers.

var add = function (a, b) {
	return a + b;
};

var mult = function (a, b) {
	return a * b;
};

// Invoke the data's reduce method, passing in the add funciton
var sum = data.reduce(add, 0); // sum is 108

// Invoke the data's reduce method, passing in the multiply function.
var product = data.reduce(mult, 1); // product is 7418880

// Give the data array a total function.

var totalSum = function () {
	return this.reduce(add, 0);
};

total = data.totalSum();

// Dementions

Array.dim = function (dimension, initial) {
	var a = [], i;
	for (i = 0, i < dimension, i += 1) {
		a[i] = initial;
	}
	return a;
};

// make an array containing 10 zeros
var myArray = Array.dim(10, 0);

var matrix = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8]
];
matrix[2][1] // 7





























