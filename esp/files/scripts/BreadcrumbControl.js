/*##############################################################################
#    Copyright (C) 2011 HPCC Systems.
#
#    All rights reserved. This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
############################################################################## */
define([
	"dojo/_base/declare",
	"dojo/store/Memory",
	"dojo/data/ObjectStore",
	"dojox/grid/DataGrid",
	"dojox/grid/EnhancedGrid",
	"dojox/grid/enhanced/plugins/Pagination",
	"dojox/grid/enhanced/plugins/Filter",
	"dojox/grid/enhanced/plugins/NestedSorting",
	"dijit/registry",
	"dijit/layout/ContentPane"
], function (declare, Memory, ObjectStore, DataGrid, EnhancedGrid, Pagination, Filter, NestedSorting, registry, ContentPane) {
	return declare(null, {
		breadcrumbSheetID: "",
		breadcrumbSheet: {},

		// The constructor    
		constructor: function (args) {
			declare.safeMixin(this, args);

			this.breadcrumbSheet = registry.byId(this.breadcrumbSheetID);
		},

		clearHistory: function () {
			var children = this.breadcrumbSheet.getChildren();
			var foundCurrent = false;
			for (var i = 0; i < children.length; ++i) {
				if (foundCurrent == true) {
					this.breadcrumbSheet.removeChild(children[i]);
				} else if (this.breadcrumbSheet.selectedChildWidget == children[i]) {
					foundCurrent = true;
				}
			}
		},

		clearAllHistory: function () {
			var children = this.breadcrumbSheet.getChildren();
			var foundCurrent = false;
			for (var i = 0; i < children.length; ++i) {
				if (i > 0) {
					this.breadcrumbSheet.removeChild(children[i]);
				}
			}
		},

		openPage: function (paneInfo) {
			this.clearHistory();
			var newChild = new ContentPane(paneInfo);
			this.breadcrumbSheet.addChild(newChild);
			this.breadcrumbSheet.selectChild(newChild);
			this.breadcrumbSheet.resize();
			return newChild;
		},

		openRootPage: function (newChild) {
			this.clearHistory();
			//this.breadcrumbSheet.addChild(newChild);
			//this.breadcrumbSheet.selectChild(newChild);
			return newChild;
		}
	});
});
