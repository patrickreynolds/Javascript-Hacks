/* Backbone Models */
var TodoItem = Backbone.Model.extend({});

var todoItem = new TodoItem(
	{ description: 'Pick up milk', status: 'inconplete', id: 1 }
);

/* Model Tests */
console.log(todoItem.get('description'));
console.log(todoItem.get('status'));
console.log(todoItem.set({status: 'complete'}));
console.log(todoItem.get('status'));


/* Backbone Views */
var TodoView = Backbone.View.extend({
	render: function(){
		var html = '<h3>' + this.model.get('description') + '</h3>';
		$(this.el).html(html);
	}
});

var todoView = new TodoView({ model: todoItem });
todoView.render();
$('.todo-list').html(todoView.el);
//console.log(todoView.el);

/* View tests */