// Javascript: The Good Parts - Chapter 5

// Inheritance

// Object Specifiers
var myObject = maker(f, l, m, c, s);

var myObject = maker ({
	first: f, 
	last: l,
	state: s,
	city: c
});

// Prototypal pattern
var myMammal = {
	name : 'Herb the Mammal', 
	get_name : function () {
		return this.name;
	},
	says : function () {
		return this.string || '';
	}
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
	var i, s = '';
	for (i = 0; i < n; i++) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};

myCat.get_name = function () {
	return this.says() + ' ' + this.name + ' ' + this.says();
};

// Functional pattern with private properties
var mammal = function (spec) {
	var that = {};

	that.get_name = function () {
		return spec.name;
	};

	that.says = function () {
		return spec.saying || '';
	};

	return that;
}
var myMammal = mammal({name: 'Herb'});

// Functional pattern of the cat example
var mammal = function (spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function (n) {
		var i, s = '';
		for (i = 0; i < n; i += 1) {
			if (s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function () {
		return that.says() + ' ' + spec.name + ' ' + that.says();
		return that;
	};
};

var myCat = cat( { name: 'Henrietta'} );

var coolcat = function (spec) {
	var that = cat(spec),
		super_get_name = that.superior('get_name');
	that.get_name = function (n) {
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};

var myCoolCat = coolcat( { name: 'Bix'} );
var name = myCoolCat.get_name();
// 'like meow Bix meow baby '































