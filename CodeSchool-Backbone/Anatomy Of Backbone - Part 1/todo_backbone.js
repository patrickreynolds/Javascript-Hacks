
// Backbone Model
// var TodoItem = Backbone.Model.extend({ urlRoot: '/todos'});
// var todoItem = new TodoItem({id: 1});
// todoItem.fetch(); // GET /todos/1

var TodoItem = Backbone.Model.extend({
  urlRoot: "http://myapi.com/todos",
  initialize: function(){
    this.on("change", this.update_view, this);
  },
  defaults: {
    description: 'Empty todo...',
    status: 'incomplete'
  },
  toggle_status: function() {
    this.get('status') === 'complete' ? this.set( {status: 'incomplete'} ) : this.set( {status: 'complete'} );
    // this.save();
  },
  update_view: function() {
     console.log("Update View From Model: " + this.toJSON());
     todoView.render();
  }
});

// Adding a todoItem instance
var todoItem = new TodoItem({ description: 'Pick up milk', status: 'incomplete', id: 1 });

// Creating a new todo item
// var todoItem = new TodoItem();
// todoItem.set({description: 'Fill pescription'});
// todoItem.save(); // POST /todos

// todoItem.get('id') // returns id of 2
// todoItem.destroy(); // DELETE /todos/2

// To get an attribute
// todoItem.get('description');

// To set an attribute
// todoItem.set( {status: 'complete'} );

// Get data from the server
// todoItem.url = '/todos';

// Populate model from server
// todoItem.fetch(); // GET /todos/1

// Sync to the server
// todoItem.save(); // PUT /todos/1


// Model driver code
console.log(todoItem.get('description'));
console.log(todoItem.get('status'));
// console.log(todoItem.set({status: 'complete'}));
// console.log(todoItem.get('status'));


// Backbone Collections
// Built in events:
// add - When amodel is added
// remove - When a model is removed
// reset - When reset or fetched
var TodoList = Backbone.Collection.extend({
  initialize: function(){
    this.on('remove', this.hideModel);
  },
  hideModel: function(model){
    model.trigger('hide');
  },
  model: TodoItem,
  url: '/todos'
});

var todoList = new TodoList();
todoList.reset([
  { description: 'Pick up milk.', status: 'incomplete', id: 1 },
  { description: 'Learn Backbone', status: 'complete', id: 2 },
  { description: 'Test application', status: 'incomplete', id: 3 }
]);

// forEach iteration function applies an operation to each model instance
// todoList.forEach(function(todoItem){
//   alert( todoItem.get('description'));
// });

// map returns an array of all return values defined in the function
console.log(
  todoList.map(function(todoItem){
    return todoItem.get('status') === "incomplete";
  })
);

// Additional iteration functions
// forEach, find, every, include, min, sortedIndex, size, rest, indexOf, chain
// reduce, filter, all, invoke, sortBy, shuffle, first, last, lastIndexOf,
// reduceRight, reject, some, max, groupBy, toArray, initial, without, isEmpty


// Populating a collection from an array.
// todoList.reset( todos );
// var doThing = function(){

// }
// todoList.on('reset', doSomething);

// Get number of models
// todoList.length;

// Add a model instance
// todoList.add( todoItem1 );

// Get model instance at index 0
// todoList.at( 0 );

// Get by id 1
// todoList.get( 1 );

// Removing a model instance
// todoList.remove( todoItem1 );

// var todos = [
//   { description: 'Pick up milk.', status: 'incomplete' },
//   { description: 'Get a car wash', status: 'incomplete' },
//   { description: 'Learn Backbone', status: 'incomplete' }
// ];

// Populating a collection from an array.
// todoList.reset( todos );

// Populating a collection from the server.
// todoList.fetch();

// Backbone View

//Model TodoView
var TodoView = Backbone.View.extend({
  initialize: function(){
    this.model.on("change", this.render, this);
    this.model.on("destroy", this.remove, this);
    this.model.on("hide", this.remove, this);
  },
  events: {
    "click input": "toggle_status"
  },
  tagName: 'article',
  id: 'todo-view',
  className: 'todo',
  template: _.template(
    '<div class=\'alert ' +
    '<% status === "complete" ? print("alert-success") : print("alert-danger")  %>\'>' +
      '<div class="checkbox">' +
        '<label class="<%= status %>">' +
        '<input type="checkbox" ' +
        '<% if(status === "complete") print("checked") %>/>' +
        '<%= description %>' +
        '</label>' +
        '</div>' +
    '</div>'),
  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  },
  toggle_status: function(){
    this.model.toggle_status();
  },
  remove: function(){
    this.$el.remove();
  }
});

var TodoListView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },
  addOne: function(todoItem){
      var todoView = new TodoView({model: todoItem});
      this.$el.append(todoView.render().el);
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);
    return this;
  },
  render: function(){
    this.addAll();
  }
});

// todoView instance and append view to the file
//var todoListView = new TodoListView({ collection: todoList });
//todoListView.render();
// console.log(todoListView.el);
//$('.todo-list').html( todoListView.el );



// Backbone Router
// var TodoRouter = Backbone.Router.extend({
//   routes: {
//     '': 'index',
//     'todos/:id': 'show'
//   },
//   index: function(){
//     this.todoList.fetch();
//   },
//   show: function(id){
//     this.todoList.focusOnTodoItem(id);
//   },
//   initialize: function(options){
//     this.todoList = options.todoList;
//   }
// });

var TodoApp = new (Backbone.Router.extend({
  routes: { "": "index", "todos/:id": "show" },
  initialize: function(){
    this.todoList = new TodoList();
    this.todoList.reset([
      { description: 'Pick up milk.', status: 'incomplete', id: 1 },
      { description: 'Learn Backbone', status: 'complete', id: 2 },
      { description: 'Test application', status: 'incomplete', id: 3 }
    ]);
    this.todosView = new TodoListView({collection: this.todoList});
    $('.todo-list').append(this.todosView.el);
  },
  start: function(){
    Backbone.history.start({ pushState: true });
  },
  index: function(){
    this.todoList.fetch();
  },
  show: function(id){
    this.todoList.focusOnTodoItem(id);
  }
}));

//$(function(){ TodoApp.start() });

/*

// Models
var Appointment = Backbone.Model.extend({
  defaults: function() {
    return {
      'date': new Date(),
      'cancelled': false,
      'title': 'Checkup'
    };
  }
});
 
var AppointmentList = Backbone.Collection.extend({
  model: Appointment
});

// Views
var AppointmentView = Backbone.View.extend({
  template: _.template('<span class="<% if(cancelled) print("cancelled") %>"><%= title %></span><a href="#">x</a>'),
 
  initialize: function(){
    this.model.on('change', this.render, this);
  },
    
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
 
var AppointmentListView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.render, this);
  },
  render: function(){
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(model){
    var appointmentView = new AppointmentView({model: model});
    appointmentView.render();
    this.$el.append(appointmentView.el);
  }
});

// Router
var AppRouter = new (Backbone.Router.extend({
  routes: { "appointments/:id": "show", "": "index" },

  initialize: function(options){
    this.appointmentList = new AppointmentList();
  },

  start: function(){
    Backbone.history.start({pushState: true});
  },

  index: function(){
    var appointmentsView = new AppointmentListView({collection: this.appointmentList});
    appointmentsView.render();
    $('#app').html(appointmentsView.el);
    this.appointmentList.fetch();
  },

  show: function(id){
    var appointment = new Appointment({id: id});
    var appointmentView = new AppointmentView({model: appointment});
    appointmentView.render();
    $('.todo-list').html(appointmentView.el);
    appointment.fetch();
  }
}));

$(function(){ AppRouter.start() });

*/

