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



// Backbone View
// var SimpleView = Backbone.View.extend({ tagName: 'li'})
// var simpleView = new SimpleView();
// <li></li>

var TodoView = Backbone.View.extend({
  initialize: function(){
    this.model.on("change", this.render, this);
    this.model.on("destroy", this.remove, this);
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
  },
  toggle_status: function(){
    this.model.toggle_status();
  },
  remove: function(){
    this.$el.remove();
  }
});

// todoView instance and append view to the file
var todoView = new TodoView({ model: todoItem });
todoView.render();
$('.todo-list').html( todoView.el );




