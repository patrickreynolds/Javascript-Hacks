var app = app || {};

var PageElement = new Backbone.Model.extend({

	events: {
		'click .change-color': 'promptColor'
	},

	promptColor: function() {
		var cssColor = prompt("Please enter a CSS color:");
		var pageElementId = prompt("Please enter a page element id: ");
    	this.set({color: cssColor});
    	this.set({element: pageElementId})
	}
});

window.pageElementId = new PageElement;

pageElement.on('change:color', function(model, color, pageElementId) {
  $('#'+pageElementId+'').css({background: color});
});

pageElement.set({color: 'white'});