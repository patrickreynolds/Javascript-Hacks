/**
* API Schema	
* url             HTTP Method  Operation
* 1. /api/books      GET          Get an array of all books
* 2. /api/books/:id  GET          Get the book with id of :id
* 3. /api/books      POST         Add a new book and return the book with an id attribute added
* 4. /api/books/:id  PUT          Update the book with id of :id
* 5/ /api/books/:id  DELETE       Delete the book with id of :id
*/
var application_root = __dirname,
	
	// Web server framework
	express = require( 'express' ),
	
	// Utilities for deailing with file paths
	path = require( 'path' ),
	
	// MongoDB integration
	mongoose = require( 'mongoose' );

// Create server
var app = express();

// Configure server
app.configure( function() {
	// parses request body and populates request.body
	app.use( express.bodyParser() );

	// checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	// perform route lookup based on url and HTTP method
	app.use( app.router );

	// Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );

	// Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

	// 1. Get an array of all books
	app.get( '/api/books', function( request, response ){
		return BookModel.find( function( err, books ) {
			if ( !err ) {
				return response.send( books );
			} else {
				return console.log( err );
			}
		});
	});

	// 2. Get the book with id of :id
	app.get( '/api/books/:id', function( request, response ) {
		return BookModel.findById( request.params.id, function( err, book ) {
			if ( !err ) {
				return response.send( book );
			} else {
				return console.log( err );
			}
		});
	});

	// 3. Add a new book and return the book with an id attribute added
	app.post( '/api/books', function( request, response ) {
		var book = new BookModel({
			title: request.body.title,
			author: request.body.author,
			releaseDate: request.body.releaseDate,
			keywords: request.body.keywords
		});

		return book.save( function( err ) {
			if ( !err ) {
				console.log( 'Created book with id: ' + request.params.id );
				return response.send( book );
			} else {
				console.log( err );
			}
		});
	});

	// 4. Update the book with id of :id
	app.put ( '/api/books/:id', function( request, response ) {
		console.log( 'Updating book ' + request.body.title );
		return BookModel.findById( request.params.id, function( err, book ) {
			book.title = request.body.title;
			book.author = request.body.author;
			book.releaseDate = request.body.releaseDate;
			book.keywords = request.body.keywords;
		
			return book.save( function( err ) {
				if( !err ) {
					console.log( 'book updated' );
				} else {
					console.log( err );
				}
				return response.send( book );
			});
		});
	});

	// 5. Delete the book with id of :id
	app.delete( '/api/books/:id', function( request, response) {
		console.log( 'Deleting book with id: ' + request.params.id );
		return BookModel.findById( request.params.id, function( err, book ) {
			return book.remove( function( err ) {
				if ( !err ) {
					console.log( 'book deleted' );
					return response.send( '' );
				} else {
					console.log( err );
				}
			});
		});
	});

});



// Start server
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});


// MongoDB
mongoose.connect( 'mongodb://localhost/library_database' );

// Schemas
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [ Keywords ]
});

var Keywords = new mongoose.Schema({
	keyword: String
});

// Models
var BookModel = mongoose.model( 'Book', Book );