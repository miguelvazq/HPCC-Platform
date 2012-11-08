define([
	"dojo/_base/declare",
	"dojo/_base/xhr",
	"dojo/data/ObjectStore",
	"dijit/MenuBar", "dijit/MenuBarItem",
	"dijit/layout/BorderContainer",
	"dojox/grid/EnhancedGrid", "dojox/grid/enhanced/plugins/Pagination", "dojox/grid/enhanced/plugins/IndirectSelection",
	"hpcc/TpTargetClusterQueryStore",
	"hpcc/ESPFilter",
	"hpcc/ESPBase"
], function (declare, xhr, ObjectStore, MenuBar, MenuBarItem, BorderContainer, EnhancedGrid, Pagination, IndirectSelection, TpTargetClusterQueryStore, ESPFilter, ESPBase) {
	return declare([BorderContainer, ESPBase], {
		showActions: true,
		showFilter: true,

		grid: null,
		filter: null, 

		constructor: function (args) {
			declare.safeMixin(this, args);
		},

		buildRendering: function () {
			this.inherited(arguments);
			if (this.showActions) {
				this.createActions();
			}
			this.createGrid();
			if (this.showFilter) {
				this.createFilter();
			}
		},

		createActions: function () {
			var menuBar = new MenuBar({
				region: "top"
			});
			this.addChild(menuBar);
		},

		createGrid: function () {
			var store = new TpTargetClusterQueryStore();
			var objStore = new ObjectStore({ objectStore: store });
			this.grid = new EnhancedGrid({
				store: objStore,
				region: "center",
				query: { id: "*" },
				structure: [
					{ name: "Name", field: "Name", width: "auto" },
					{ name: "Prefix", field: "Prefix", width: "auto" },
					{ name: "Type", field: "Type", width: "auto" }
					],
				plugins: {
					//					nestedSorting: true,
					pagination: {
						pageSizes: [25, 50, 100, "All"],
						defaultPageSize: 50,
						description: true,
						sizeSwitch: true,
						pageStepper: true,
						gotoButton: true,
						maxPageStep: 4,
						position: "bottom"
					},

					indirectSelection: {
						headerSelector: true,
						width: "20px",
						styles: "text-align: center;"
					}
				}
			});

			var context = this;
			this.grid.on("RowDblClick", function (evt) {
				if (context.onRowDblClick) {
					var idx = evt.rowIndex;
					var item = this.getItem(idx);
					var Wuid = this.store.getValue(item, "Wuid");
					context.onRowDblClick(Wuid);
				}
			}, true);

			dojo.connect(this.grid.selection, 'onSelected', function (idx) {
				context.selectionChanged(idx);
			});
			dojo.connect(this.grid.selection, 'onDeselected', function (idx) {
				context.selectionChanged(idx);
			});

			this.addChild(this.grid);
			this.grid.startup();
		},

		createFilter: function () {
			this.filter = new ESPFilter({
				title: "Filter",
				region: "top",
				grid: this.grid,
				content:
						"<table style='border: \"1px solid #9f9f9f;\"' cellspacing='2'>" +
							"<tr><td><label>Type:</label></td><td><input name='Type' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Name:</label></td><td><input name='Name' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
						"</table>"
			});
			this.addChild(this.filter);
		},

		setFilter: function (filter) {
			this.filter.queryForm.reset();
			this.filter.queryForm.setValues(filter);
			this.grid.setQuery(this.filter.queryForm.getValues());
		},

		hasSelection: false,
		selectionChanged: function (idx) {
			if (this.hasSelection && this.grid.selection.getSelected().length == 0) {
				this.hasSelection = false;
			} else if (!this.hasSelection && this.grid.selection.getSelected().length > 0) {
				this.hasSelection = true;
			}
		},

		setProtected: function (selection, protect) {
			var wuids = "";
			for (var i = 0; i < selection.length; ++i) {
				if (i > 0)
					wuids += "\n";
				wuids += selection[i].Wuid;
			}
			var request = {};
			request['Wuids'] = wuids;
			request['Protect'] = protect;
			request['rawxml_'] = "1";

			var context = this;
			xhr.post({
				url: this.getBaseURL() + "/WUProtect",
				handleAs: "xml",
				content: request,
				load: function (xmlDom) {
					context.grid.setQuery(context.grid.query, context.grid.queryOptions);
				}
			});
		}
	});
});
