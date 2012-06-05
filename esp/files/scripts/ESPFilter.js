define([
	"dojo/_base/declare",
	"dijit/_Widget",
	"dijit/_Templated",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/_Contained",
	"dijit/_CssStateMixin",
	"dijit/layout/ContentPane",
	"dijit/form/Form",
	"dijit/form/Button",
	"dojo/text!scripts/templates/ESPFilter.htm"
], function (declare, _Widget, _Templated, _TemplatedMixin, _WidgetsInTemplateMixin, _Contained, _CssStateMixin, ContentPane, Form, Button, template) {
	// Declare our widget
	return declare("scripts.ESPFilter", [ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		// get our template
		templateString: template,
		//widgetsInTemplate: true,

		// some properties
		baseClass: "hpccESPFilter",
		name: 'no name',
		title: "Filter", // we'll set this from the widget def

		// hidden counter
		_counter: 1,
		_firstClicked: false,

		startup: function () {
			//when I override a widget method I always call the parent
			//method, just in case. (Sometimes you do it in the end of the function, though):
			this.inherited(arguments);
		},

		buildRendering: function () {
			this.inherited(arguments);
		},

		postCreate: function () {
			this.inherited(arguments);
			this.setTitle(this.title);
			//this.titleNode.innerHTML = this.title;
		},

		setTitle: function (title) {
			this.myTitlePane.setTitle(title);
		},

		titlePaneToggle: function () {
			this._setOpenAttr(!this.open, false);
			this.getParent().getParent().resize();
		},

		onResize: function () {
		},

		onApply: function (args) {
			this.grid.setQuery(this.queryForm.getValues());
		},

		onClear: function () {
			this.queryForm.reset();
			this.grid.setQuery({ id: "*" });
		}
	});
}); 
