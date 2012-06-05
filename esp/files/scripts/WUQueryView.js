define([
	"dojo/_base/declare",
	"dojo/_base/xhr",
	"dojo/data/ObjectStore",
	"dijit/MenuBar", "dijit/MenuBarItem",
	"dijit/layout/BorderContainer",
	"dojox/grid/EnhancedGrid", "dojox/grid/enhanced/plugins/Pagination", "dojox/grid/enhanced/plugins/IndirectSelection",
	"hpcc/WsWorkunits",
	"hpcc/ESPFilter",
	"hpcc/ESPBase"
], function (declare, xhr, ObjectStore, MenuBar, MenuBarItem, BorderContainer, EnhancedGrid, Pagination, IndirectSelection, WsWorkunits, ESPFilter, ESPBase) {
	return declare([BorderContainer, ESPBase], {
		showActions: true,
		showFilter: true,

		deleteAction: null,
		protectAction: null,
		unprotectAction: null,
		RescheduleAction: null,
		DescheduleAction: null,
		setToFailedAction: null,

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
			this.protectAction = new MenuBarItem({
				label: "Protect", disabled: true,
				onClick: function (args) {
					context.setProtected(context.grid.selection.getSelected(), true);
				}
			});
			this.unprotectAction = new MenuBarItem({
				label: "Unprotect", disabled: true,
				onClick: function (args) {
					context.setProtected(context.grid.selection.getSelected(), false);
				}
			});
			this.RescheduleAction = new MenuBarItem({ label: "Reschedule", disabled: true });
			this.DescheduleAction = new MenuBarItem({ label: "Deschedule", disabled: true });
			this.setToFailedAction = new MenuBarItem({ label: "Set to Failed", disabled: true });
			menuBar.addChild(this.deleteAction);
			menuBar.addChild(this.protectAction);
			menuBar.addChild(this.unprotectAction);
			menuBar.addChild(this.RescheduleAction);
			menuBar.addChild(this.DescheduleAction);
			menuBar.addChild(this.setToFailedAction);
			this.addChild(menuBar);
		},

		createGrid: function () {
			var store = new WsWorkunits.WUQuery();
			var objStore = new ObjectStore({ objectStore: store });
			this.grid = new EnhancedGrid({
				store: objStore,
				region: "center",
				query: { id: "*" },
				structure: [
					{ name: "P", field: "Protected", width: "20px",
						formatter: function (protected) {
							if (protected == true) {
								return "P";
							}
							return "";
						}
					},
					{ name: "Wuid", field: "Wuid", width: "16em" },
					{ name: "Owner", field: "Owner", width: "auto" },
					{ name: "Job Name", field: "Jobname", width: "auto" },
					{ name: "Cluster", field: "Cluster", width: "auto" },
					{ name: "Roxie Cluster", field: "RoxieCluster", width: "auto" },
					{ name: "State", field: "State", width: "auto" },
					{ name: "Total Thor Time", field: "TotalThorTime", width: "auto" }
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
							"<tr><td><label>WUID:</label></td><td><input name='Wuid' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Cluster:</label></td><td><input name='Cluster' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Roxie Cluster:</label></td><td><input name='RoxieCluster' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Owner:</label></td><td><input name='Owner' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>State:</label></td><td><input name='State' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Date Start:</label></td><td><input name='StartDate' data-dojo-type='dijit.form.TextBox'/></td>" +
							"<td><label>End:</label></td><td><input name='EndDate' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>ECL:</label></td><td><input name='ECL' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Job Name:</label></td><td><input name='Jobname' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Logical File:</label></td><td><input name='LogicalFile' data-dojo-type='dijit.form.TextBox'/></td>" +
							"<td><label>Type:</label></td><td><input name='LogicalFileSearchType' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
							"<tr><td><label>Application Name:</label></td><td><input name='ApplicationName' data-dojo-type='dijit.form.TextBox'/></td>" +
							"<td><label>Key:</label></td><td><input name='ApplicationKey' data-dojo-type='dijit.form.TextBox'/></td>" +
							"<td><label>Data:</label></td><td><input name='ApplicationData' data-dojo-type='dijit.form.TextBox'/></td></tr>" +
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
				this.deleteAction.setDisabled(true);
				this.deleteAction.setDisabled(true);
				this.protectAction.setDisabled(true);
				this.unprotectAction.setDisabled(true);
				this.RescheduleAction.setDisabled(true);
				this.DescheduleAction.setDisabled(true);
				this.setToFailedAction.setDisabled(true);
			} else if (!this.hasSelection && this.grid.selection.getSelected().length > 0) {
				this.hasSelection = true;
				this.deleteAction.setDisabled(false);
				this.deleteAction.setDisabled(false);
				this.protectAction.setDisabled(false);
				this.unprotectAction.setDisabled(false);
				this.RescheduleAction.setDisabled(false);
				this.DescheduleAction.setDisabled(false);
				this.setToFailedAction.setDisabled(false);
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
