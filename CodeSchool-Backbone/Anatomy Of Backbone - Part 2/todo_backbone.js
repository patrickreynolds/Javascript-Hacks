/*
// Collections
var TodoItems = Backbone.Collection.extend({
	url: '/todos',
	parse: function(response){
		this.perPage = response.per_page;
		this.page = response.paage;
		this.total = response.total;
		return response.todos;
	}
});

// todoItems.fetch({data: { page: 6 }}); // GET /todos?page=6
// todoItems.fetch({data: {page: todoItems.page + 1}}); // GET /todos?page=2

// View
var TodosView = Backbone.View.extend({
	initialize: function(){
		this.collection.on('reset', this.render, this);
	},
	render: function(){
		this.addAll();
		return this;
	},
	addAll: function(){
		this.$el.empty();
		this.collection.forEach(this.addOne);
	},
	addOne: function(todoItem){
		var todoView = new TodoView({
			model: todoItem
		});
		this.$el.append(todoView.render().el);
	}
});

// Router
var TodoApp = new (Backbone.Router.extend({
	routes: {
		"todos/p:page": "page",
		"": "index",
		'search/:query': 'search',
		'search/:query/p:page': 'search'
	},
	page: function(page){
		this.todoItems.fetch({data: {page: page}});
	},
	initialize: function(){
		this.todoItems = new TodoItems();
		this.todosView = new TodosView({collection: this.todoItems});
		this.todosView.render();
		$('.todo-list').append(this.todosView.el);
	},
	index: function(){
		this.todoItems.fetch();
	},
	search: function(query, page){
		page = page || 0;
		console.log(query);
		console.log(page);
	}
}));
*/

/*
var TodoRouter = new (Backbone.Router.extend({
	routes: {
		'search/:query(/p:page)': 'search'
	},
	search: function(query, page){
		page = page || 0;
		console.log(query);
		console.log(page);
	}
}));

TodoRouter.navigate('search/milk', {trigger: true});
*/

/*
// Level 4: Varying Views
var todoView = new TodoView({
	model: todoItem
});

// todoView.model == todoItem

var todoView = new TodoView({
	collection: todoItems
});

// todoView.collection == todoItems


var TodoView = Backbone.View.extend({
	template: _.template("<%= description %>"),
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var todoView = new TodoView({model: todoItem, el: $('.todo-list')});
// $('.todo-list').html(todoView.render().el);
todoView.render();
*/

/*
// Level 5: Working with Forms
var TodoItem = Backbone.Model.extend({
	urlRoot: "/todos"
});

var TodoForm = Backbone.View.extend({
	template: _.template('<form>' +
		'<input name=description vlaue="<%= description %>" />' +
		'<button>Save</button></form>'),
	events: {
		submit: 'save'
	},
	save: function(e){
		e.preventDefault();
		var newDescription = this.$('input[name=description]').val();
		this.model.save({description: newDescription});
	}
});

var todoItem = new TodoItem({description: "What do you need to do?"});
var todoForm = new TodoForm({model: todoItem});
$('.todo-list').html(todoForm.render().el);
*/

// Level 6: App Organization

var bootstrap = {
	todos:[
	{id: 1, description: "Pickup Milk.", status: "complete"},
	{id: 1, description: "Pickup Kids.", status: "incomplete"},
	]
};

var App = new (Backbone.View.extend({
	Models: {},
	Views: {},
	Collections: {},
	events: {
		'click a': function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	},
	start: function(bootstrap){
		Backbone.history.start({pushState: true});
		var todos = new App.Collections.TodoItems(bootstrap.todos);
		var todosView = new App.Views.TodoItems({collection: todos});
		this.$el.append(todosView.render().el);
	},
	template: _.template('<h1>ToDo List!</h1>' +
		'<div id="app"></div>'),
	render: function(){
		this.$el.html(this.template());
	}
}))({el: document.body});

$(function(){
	App.render();
	App.start(bootstrap); 
})

App.Models.TodoItem = Backbone.Model.extend({});
App.Views.TodoItem = Backbone.View.extend({});
App.Collections.TodoItems = Backbone.Collection.extend({});
App.Views.TodoItems = Backbone.View.extend({});
App.TodoRouter = Backbone.Router.extend({});

// var todoItem = new App.Models.TodoItem({});








