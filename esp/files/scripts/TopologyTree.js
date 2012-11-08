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
	"dojo/_base/lang",
	"dojo/_base/sniff",
	"dojo/dom",
	"dojo/_base/Deferred",
	"dojo/store/util/QueryResults",
	"dijit/registry",
	"dijit/Tree",
	"hpcc/TopologyTreeStore"
], function (declare, lang, sniff, dom, Deferred, QueryResults, registry, Tree, TopologyTreeStore) {
	return declare(Tree, {
		topologyTreeID: "",
		store: null,

		constructor: function (args) {
			declare.safeMixin(this, args);
		},

		postMixInProperties: function () {
			this.inherited(arguments);
			this.store = new TopologyTreeStore();
			this.model = this.store;
			this.showRoot = false;
		}
	});
});
