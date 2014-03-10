// Javascript: The Good Parts - Chapter 8

// Methods

// Array Methods

// Concat - Produces a new array containing a shallow copy of an array.
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
// c is ['a', 'b', 'c', 'x', 'y', 'z', true]

// Join - makes a string from an array. It does this by making a string of each
// of the array's elements, and then concatenating them all together
// with a 'separator' between them.
var a = ['a', 'b', 'c'];
a.push('d');
var c = a.join(''); 		// c is 'abcd';

// Pop - Pop and Push methods make an array work like a stack. pop removes and returns the last element in this array.
// Returns undefined if the array is empty
var a = ['a', 'b', 'c'];
var c = a.pop(); 		// a is ['a', 'b'] & c is 'c'

// Implementation
Array.method('pop', function () {
	return this.splice(this.length - 1, 1)[0];
});

// Push - The push method appends items to the end of an array.
// Returns the hew length of the array
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.push(b, true);
// a is ['a', 'b', 'c', ['x', 'y', 'z'], true]
// c is 5;

// Implementation
Array.method('push', function() {
	this.splice.apply(
		this,
		[this.length, 0].
			concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});

// Reverse - Modifies the array by reversing the order of the elements. It returns the array.
var a = ['a', 'b', 'c'];
var b = a.reverse();
// both a and b are ['c', 'b', 'a']

// Shift - Removes the first element from tan array and returns it. If the array is empty,
// it returns undefined. **Shift is usually slower than pop.
var a = ['a', 'b', 'c'];
var c = a.shift();
// a is ['b', 'c'] & c is 'a'
// Implementation
Array.method('shift', function() {
	return this.splice(0, 1)[0];
});

// Slice(start, end) - Slice method makes a shallow copy fo a portion of an array.
var a = ['a', 'b', 'c'];
var b = a.slice(0, 1);		// b is ['a']
var c = a.slice(1);			// c is ['b', 'c']
var d = a.slice(1, 2);		// d is ['b']

// Sort - Sorts the ocntents of an array in place.
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
m.sort(function (a, b) {
	if (a === b) {
		return 0;
	};
	if (typeof a === typeof b) {
		return a < b ? -1 : 1;
	}
	return typeof a < typeof b ? -1 : 1;
});
// m is [4, 8, 15, 16, 23, 42, 'a', 'aa', 'bb']

// Splice(start, deleteCount, item...) - Removes elements from an array, replacingthem with new items.
var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'ache', 'bug');
// a is ['a', 'ache', 'bug', 'c']
// r is ['b']

// Unshift(item..) - Similar to push except that it shoves te items onto the front of this array instead of at the end.
var a = ['a', 'b', 'c'];
var r = a.unshift('?', '@');
// a is ['?', '@', 'a', 'b', 'c']
// r is 5

// Implementation
Array.method('unshift', function() {
	this.splice.apply(this, 
		[0, 0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});


// Apply function.apply(thisArg, argArray) - The apply method invokes a function, passing 
// in the object that will be bound to this and an optional array of arguments.
Function.method('bind', function (that) {
	// Return a function that will call this function as
	// though it is a method of that object.

	var method = this,
	slice = Array.prototype.slice,
	args = slice.apply(arguments, [1]);
	return function () {
		return method.apply(that,
			args.concat(slice.apply(arguments, [0])));
	};
});

var x = function () {
	return this.value;
}.bind({value: 666});
alert(x()); /// 666

// Number Methods

// .toExponential(fractionDigits) - converts this number to a string in the exponential form
document.writeln(Math.PI.toExponential(0));
document.writeln(Math.PI.toExponential(2));
document.writeln(Math.PI.toExponential(7));
document.writeln(Math.PI.toExponential(16));
document.writeln(Math.PI.toExponential());

// .. results
3e+0
3.14e+0
3.1415927e+0
3.1415926353...

// .toFixed(fractionDigits) - Converts this number to a string in the decimal form.
document.writeln(Math.PI.toFixed(0));
document.writeln(Math.PI.toFixed(2));
document.writeln(Math.PI.toFixed(7));
document.writeln(Math.PI.toFixed(16));
document.writeln(Math.PI.toFixed());

// ..results
3
3.14
3.1415927
3.1415926535897930
3

// .toPrecision(precision) = Converts this number to a string in the decimal form
document.writeln(Math.PI.toPrecision(2));
document.writeln(Math.PI.toPrecision(7));
document.writeln(Math.PI.toPrecision(16));
document.writeln(Math.PI.toPrecision());

// ..results
3.1
3.141593
3.141592653589792
3.141592653589792

// .toString(radix) - converts this number to a string.
document.writeln(Math.PI.toString(2));
document.writeln(Math.PI.toString(8));
document.writeln(Math.PI.toString(16));
document.writeln(Math.PI.toString());

// Object
// .hasOwnProperty(name) - returns true if the object contains a property having the name
var a = {mamber: true};				
var b = Object.create(a);			// from Chapter 3
var t = a.hasOwnProperty('member');	// t is true
var u = b.hasOwnProperty('member');	// u is false
var v = b.member;					// v is true

// String Methods

// .charAt(pos) - returns the character at position pos in this string.
// If pos is less than zero or greater than or equal to string.length, it returns the empty string
var name = 'Curly';
var initial = name.charAt(0); // initial is 'C'

// implementation
String.method('charAt', function (pos) {
	return this.slice(pos, pos + 1)
})


// .charCodeAt(pos) - same as .charAt, but retuns an integer representation of the code point value of the character
var name = 'Curly';
var initial - name.charCodeAt(0); 	// initial is 67

// .concat(string...) - Concatenates two strings together.
var s = 'C'.concat('a', 't'); // s is 'Cat'


// .indexOf(searchString, position) - .indexOf searches for a searchString within a string.
// If it si found, it returns the position of the first matched character; otherwise, it returns -1
var test = 'Mississippi';
var p = text.indexOf('ss'); // p is 2
p = text.indexOf('ss', 3)  	// p is 5
p = text.indexOf('ss', 6) 	// p is -1

// .lastIndexOf(searchString, posiiton) - same as .indexOf, but that it searches from the end of the string instead of the front
var text = 'Mississippi';
var p = text.lastIndexOf('ss'); 	// p is 2
p = text.lastIndexOf('ss', 3); 		// p is 5
p = text.lastIndexOf('ss', 6);		// p is 5


// .localeCompare(that)
var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];
m.sort(function (a, b) {
	return a.localeCompare(b);
});
// m (in some locale) is
// ['a', 'A', 'aa', 'Aa', 'aaa', 'AAA']

// .match(regexp) - matches a string and a regular expression.
var text = '<html><body bgcolor=linen><p>' + 'This is <b>bold<\/b>!<\/p><\/body><\/html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
var a, i;

a = text.match(tags);
for (i = 0; i < a.length; i += 1) {
	document.writeln(('// [' + i + '] ' + a[i]).entityify());
}

// .replace(serachValue, replaceValue) - Does a serach and replace operation on this string, producing a new string.

// .slice(start, end) - Makes a new string by copying a portion of another string.
var text = 'and in it he says "Any damn fool could';
var a = text.slice(18);
// a is '"Any damn fool could'
var b = text.slice(0, 3);
// b is 'and'
var c = text.slice(-5);
// c is 'could'
var d = text.slice(19, 32);
// d is 'Any damn fool'

// .split(seperator, limit) - Creates an array of strings by splitting this string into pieces.
var digits = '0123456789';
var a = digits.split('', 5);
// a is ['0', '1', '2', '3', '456789']

var ip = '192.168.1.0';
var b = ip.split('.');
// b is ['192', '168', '1', '0']

var c = '|a|b|c'.split('|');
// c is ['', 'a', 'b', 'c', '']

var text = 'last,  first  , middle';
var d = text.split(/\*,\s*/);
// d is ['last',
//       'first',
// 		 'middle']
// ]

var e = text.split(/\*(,)\s*/);
// e is ['last',
//       ',',
//       'first',
//		 ',',
//		 'middle'
// ]

// .substring(start, end) - Same as the slice method except that it doesn't handle the adjustment for negative parameters.

// .toLocaleLowerCase() - Produces a new string that is made by converting this string to lowercase using the rules for the locale.

// .toLocaleUpperCase() - Produces a new string that is mde by converting this string to uppercase using the rules for the locale.

// .toLowerCase() - Produces a new string that is made by converting this string to lowercase

// .toUpperCase() - Produces a new string that is made by converting this string to uppercase

// .fromCharCode(char..) - Produces a string from a series of numbers
var a = String.fromCharCode(67, 97, 116);
// a is 'Cat'



















