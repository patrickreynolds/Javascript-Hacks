var Todo = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    completed: false
  },

  validate: function(attributes) {
  	if(attributes.title === undefined){
        return "Remember to set a title for your todo.";
    }
  },

  initialize: function(){
    console.log('This model has been initialized.');
    this.on('change:title', function(){
        console.log('Title value for this model has changed.');
    });
    this.on('invalid', function(model, error) {
    	console.log(error);
    });
    this.on('change:completed', function(){
    	console.log('Completion status for this model has changed.');
    });
  },

  setTitle: function(newTitle){
    this.set({ title: newTitle });
  },

  setCompleted: function(completionStatus){
  	this.set({ completed: completionStatus });
  }
});

var myTodo = new Todo();

// Both of the following changes trigger the listener:
myTodo.set('title', 'Check what\'s logged.', { validate: true });
myTodo.setTitle('Go fishing on Sunday.');

// But, this change type is not observed, so no listener is triggered:
myTodo.set( 'completed', false );
myTodo.setCompleted(true);
console.log(myTodo.toJSON());

var mySecondTodo = new Todo();
mySecondTodo.set('completed', true, {validate: true});
console.log(mySecondTodo.toJSON());

/*

Todo.printTodoObject = function(todoObject) {
	console.log(todoObject.get('title'));
	console.log(todoObject.get('completed'));
	var objectAttributes = todoObject.toJSON();
	console.log(objectAttributes);
};


var InstagramUser = Backbone.Model.extend({

	// Defaults todo attrubute values
	defaults: {
		username: '',
			 bio: '',
		 website: '',
		 profile_picture: '',
		 full_name: '',
		 id: ''
	}
});

var newInstaUser = new InstagramUser({
	username: 'pattysnacks',
	bio: 'Live well, laugh often.',
	website: 'http://www.thegoodlife.com',
	profile_picture: 'http://profilepicture.png',
	full_name: 'Patrick Reynolds',
	id: '123456789'
});

var newInstaUserAttributes = newInstaUser.toJSON();
console.log(newInstaUserAttributes);
*/