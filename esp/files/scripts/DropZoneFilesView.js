define([
	"dojo/_base/declare",
	"dojo/_base/xhr",
	"dojo/data/ObjectStore",
	"dijit/MenuBar", "dijit/MenuBarItem",
	"dijit/layout/BorderContainer",
	"dojox/grid/EnhancedGrid", "dojox/grid/enhanced/plugins/Pagination", "dojox/grid/enhanced/plugins/IndirectSelection",
	"hpcc/WsFileSpray",
	"hpcc/ESPFilter",
	"hpcc/ESPBase"
], function (declare, xhr, ObjectStore, MenuBar, MenuBarItem, BorderContainer, EnhancedGrid, Pagination, IndirectSelection, WsFileSpray, ESPFilter, ESPBase) {
	return declare([BorderContainer, ESPBase], {
		showActions: true,
		showFilter: true,

		deleteAction: null,
		addToSuperfileAction: null,
		copyAction: null,
		renameAction: null,
		replicateAction: null,
		desprayAction: null,

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
			var context = this;
			this.deleteAction = new MenuBarItem({ label: "Delete", disabled: true });
			this.addToSuperfileAction = new MenuBarItem({ label: "Add To Superfile", disabled: true });
			this.copyAction = new MenuBarItem({ label: "Copy", disabled: true });
			this.renameAction = new MenuBarItem({ label: "Rename", disabled: true });
			this.replicateAction = new MenuBarItem({ label: "Replicate", disabled: true });
			this.desprayAction = new MenuBarItem({ label: "Despray", disabled: true });
			menuBar.addChild(this.deleteAction);
			menuBar.addChild(this.addToSuperfileAction);
			menuBar.addChild(this.copyAction);
			menuBar.addChild(this.renameAction);
			menuBar.addChild(this.replicateAction);
			menuBar.addChild(this.desprayAction);
			this.addChild(menuBar);
		},

		createGrid: function () {
			var store = new WsFileSpray.FileList();
			var objStore = new ObjectStore({ objectStore: store });
			this.grid = new EnhancedGrid({
				store: objStore,
				region: "center",
				query: { id: "*",
					Prefix: this.Prefix
				},
				structure: [
					{ name: "C", field: "isZipfile", width: "20px",
						formatter: function (isZipfile) {
							if (isZipfile == true) {
								return "C";
							}
							return "";
						}
					},
					{ name: "I", field: "IsKeyFile", width: "20px",
						formatter: function (IsKeyFile) {
							if (IsKeyFile == true) {
								return "I";
							}
							return "";
						}
					},
					{ name: "Name", field: "name", width: "auto" },
					{ name: "Size", field: "filesize", width: "auto" },
					{ name: "Modified (UTC/GMT)", field: "modifiedtime", width: "auto" },
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
					var Name = this.store.getValue(item, "Name");
					context.onRowDblClick(Name);
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
							"<tr><td><label>Network Address:</label></td><td><input name='Netaddr' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Path:</label></td><td><input name='Path' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Mask:</label></td><td><input name='Mask' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>OS:</label></td><td><input name='OS' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
						"</table>"
			});
			this.addChild(this.filter);
		},

		setFilter: function (filter) {
			this.filter.queryForm.reset();
			this.filter.queryForm.setValues(filter);
			this.grid.setQuery(this.filter.queryForm.getValues());
		},

		selectionCount: 0,
		selectionChanged: function (idx) {
			if (this.selectionCount > 0 && this.grid.selection.getSelected().length == 0) {
				this.deleteAction.setDisabled(true);
				this.addToSuperfileAction.setDisabled(true);
				this.copyAction.setDisabled(true);
				this.renameAction.setDisabled(true);
				this.replicateAction.setDisabled(true);
				this.desprayAction.setDisabled(true);
			} else if (!this.hasSingleSelection && this.grid.selection.getSelected().length == 1) {
				this.deleteAction.setDisabled(false);
				this.addToSuperfileAction.setDisabled(false);
				this.copyAction.setDisabled(false);
				this.renameAction.setDisabled(false);
				this.replicateAction.setDisabled(false);
				this.desprayAction.setDisabled(false);
			} else if (!this.hasSelection && this.grid.selection.getSelected().length > 0) {
				this.deleteAction.setDisabled(false);
				this.addToSuperfileAction.setDisabled(false);
				this.copyAction.setDisabled(true);
				this.renameAction.setDisabled(true);
				this.replicateAction.setDisabled(true);
				this.desprayAction.setDisabled(true);
			}
			this.selectionCount = this.grid.selection.getSelected().length;
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
