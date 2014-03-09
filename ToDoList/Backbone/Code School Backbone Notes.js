// Model
var TodoItem = Backbone.Model.extend({});

// Defind the model instance
var todoItem = new TodoItem(
	{ description: 'Pick up milk', status: 'incomplete', id: 1 }
);

// Get an attribute
todoItem.get('description');

// Set an attribute
todoItem.set({dstatus: 'complete'});

// Sync to the server
todoItem.save();
Data -> Models -> Views -> DOM

// View class
var TodoView = Backbone.View.extend({
	render: function(){
		var html = '<h3>' + this.model.get('description') + '</h3>';
		$(this.el).html(html);
	}
});

// Create a view instance
var todoView = new TodoView({ model: todoItem });

// Set appointment
appointment.set('title', 'My knee hurts');