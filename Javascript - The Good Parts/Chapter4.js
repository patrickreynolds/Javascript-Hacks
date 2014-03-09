// Javascript: The Good Parts - Chapter 4

// Functions

// Create a variable called add and store a function in it that adds two numbers

// Formal invocation pattern
var myObject = {
	value: 0,
	increment: function(inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment();
document.writeln(myObject.value); // 3

var add = function(a, b) {
	return a + b;
};

var sum = add(3, 4)	// 7

// Constructor invocation pattern
var Quo = function (string) {
	this.status = string;
}

// Give all instances of QUO a public method

Quo.prototype.get_status = function() {
	return this.status;
};

// make an instance of Quo
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status()); // Confused

// Arguments
var sum = function() {
	var i, sum = 0;
	for (i = 0; i < arguments.length; i += 1) {
		sum += arguments[i];
	}
	return sum;
};

document.writeln(sum(4, 8, 16, 16, 23, 42)); // 108

// Exceptions

var add function (a, b) {
	if (typeof a +== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	};
	return a + b;
}

var try_it = function(){
	try {
		add("seven");
	} catch {
		document.writeln(e.name + ': ' + e.message);
	}
}

try_it();


// Augmenting Types

// Syntax example
Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}

// Adding a javascript method to remove spaces from a string
String.method('trim', function(){
	return this.replace(/^\s|\s+$/g, '');
});

document.writeln('"' + "   neat   ".trim() + '""');

// Adding a method conditionally
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
};

// Recursion
var hanoi = function (disc, src, aux, dst) {
	if (disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
};

hanoi(3, 'Src', 'Aux', 'Dst');


// Recursive walk the dom function
var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
};


// Scope
var foo = function () {
	var a = 3, b = 5;

	var bar = function() {
		var b = 7, c = 11;

		// at this point, a is 3, b is 7, and c is 11

		a += b + c;

		// At this point, a is 21, b is 7, and c is 11

	};

	// At this point, a is 3, b is 5, and c is not defined

	bar();

	// At this point, a is 21, and b is 5

};


// Closures

var myObject = function () {
	var value = 0;

	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 1;
		};
		getValue: function () {
			return value;
		}
	};
}();

// Closure example
var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFF' + hex + hex;
		if (level < 15) {
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

fade(document.body);

// Callbacks
request = prepare_the_request();
send_request_asynchronously(request, function (response){	
	display(response);
});


// Modules
String.method('deentityify', function() {

	// The entitiy table. It maps entitiy names to characters.

	var entity = {
		quot: '""',
		lt: '<',
		gt: '>'
	};

	return function() {
		return this.replace(/&([^&;]+);/g,
			function (a, b) {
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			}
		);
	}
}());

// Sereal maker example
var serial_maker = function () {

	// Produce an object that produces unique strings. A 
	// unique string is made up of two parts: a prefix
	// and a sequence number. The object comes with methods
	// for setting the prefix and sequence number, and gensym 
	// method that produces unique strings.

	var prefix = '';
	var seq = o;
	return {
		set_prefix: function (p) {
			prefix = String(p);
		},
		set_seq: function (s) {
			seq = s;
		},
		gensym: function () {
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.set_prefix = ('Q');
seqer.set_seq = (1000);
var unique = seqer.gensym();	// unique is "Q1000"


// Cascade 
getElement('myBoxDiv').
	move(350, 150).
	width(100).
	height(100).
	color('red').
	border('10px outset').
	padding('4px').
	appendText("Please stand by").
	on('mousedown', function (m) {
		this.startDrag(m, this.getNinth(m));
	}).
	on('mousemove', 'drag').
	on('mouseup', 'stopDrag').
	later(2000, function () {
		this.
			color('yellow').
			setHTML("What hath God wraught?").
			slide(400, 40, 200, 200);
	}).
	tip('This box is resizeable');

// Curry - Currying allows us to roduce a new function by combining a fuction and an argument:
var add1 = add.curry(1);
document.writeln(add1(6)); 		// 7

Function.method('curry', function() {
	var slice = Array.prototype.slice,
	args = slice.apply(arguments),
	that = this;
	return function () {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});		// Something isn't right...


// Memoization with a fibonacci sequence

var fibonacci = function () {
	var memo = [0, 1];
	var fib = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}();






















