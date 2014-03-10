// Javascript: The Good Parts - Chapter 7

// Regular Expressions
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

var blanks = '       ';
var i;

for ( i = 0; i < names.length; i += 1) {
	console.log("" + names[i] + "");
	document.writeln("<p>" + names[i] + ":" + blanks.substring(names[i].length), result[i] + "</p>");
}
// End example

// Capturing group 1
(?:([A-Za-z]+):)?

// ^ character indicates the beginning of the string.
(?:([A-Za-z]+):)? // Matches a name only if it's followed by a colon

// (?:...) indicates a noncapturing group

// ? indicates that the group is optional

// (...) indicates a capturing group. This would appear in result 1.

// The character class, A-Za-z, contains 26 uppercase letters and 26 lowercase letters.
// The hyphens indicate ranges, from A to Z.
// The suffix + indicates that the character class will be matched one or more times.
// The group is followed by a color because it will be matched literally.

// Capturing group 2
(\/{0,3})

// \/ indicates that a / (slash) character should be matched. It is escapted 
// with \ (backslash) so that it is not misinterpreted as the end of the regular expression literal

// The suffix {0, 3} indicates that the / will be matched 0 or 1 or 2 or 3 times:

// Capturing group 3
([0-9].\-A-Za-z]+)

// made up of one or more digits, letters, or . or -. The - was the escaped as \- to prevent it
// from being confused with the range hyphen.

// Capturing group 4
(?::(\d+))?

// Sequence of one or more digits preceded by a :. \d represents a digit character

// Capturing group 5
(?:\/([^?#]*))?

// Another optional group
// begins with a /. the character class [^?#] begins with a ^, which indicates 
// that the class includes all characters execpt ? and #.
// The * indicates that the character class is matched zero or more times.

// Capturing group 6
(:#(.#))?

// optional group begins with #
// The . will match any character except a line-ending character

$
// The $ represents the end of the string.

























