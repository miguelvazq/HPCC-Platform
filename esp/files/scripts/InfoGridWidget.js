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
    "dojo/_base/array",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",

    "dijit/registry",
    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",

    "dojox/grid/DataGrid",

    "hpcc/ESPWorkunit",

    "dojo/text!../templates/InfoGridWidget.html"
],
    function (declare, array, Memory, ObjectStore, 
            registry, _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, 
            DataGrid,
            ESPWorkunit,
            template) {
        return declare("InfoGridWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,
            baseClass: "InfoGridWidget",
            infoGrid: null,

            dataStore: null,

            lastSelection: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.infoGrid = registry.byId(this.id + "InfoGrid");

                var context = this;
                this.infoGrid.on("RowClick", function (evt) {
                });

                this.infoGrid.on("RowDblClick", function (evt) {
                });
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.infoGrid.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Plugin wrapper  ---
            onClick: function (items) {
            },

            onDblClick: function (item) {
            },

            init: function (params) {
                this.wu = new ESPWorkunit({
                    wuid: params.Wuid
                });

                var context = this;
                this.wu.monitor(function () {
                    context.wu.getInfo({
                        onGetExceptions: function (exceptions) {
                            context.loadExceptions(exceptions);
                        }
                    });
                });
            },

            setQuery: function (graphName) {
                if (!graphName || graphName == "*") {
                    this.infoGrid.setQuery({
                        GraphName: "*"
                    });
                } else {
                    this.infoGrid.setQuery({
                        GraphName: graphName,
                        HasSubGraphId: true
                    });
                }
            },

            getSelected: function () {
                return this.infoGrid.selection.getSelected();
            },

            setSelected: function (selItems) {
                for (var i = 0; i < this.infoGrid.rowCount; ++i) {
                    var row = this.infoGrid.getItem(i);
                    this.infoGrid.selection.setSelected(i, (row.SubGraphId && array.indexOf(selItems, row.SubGraphId) != -1));
                }
            },

            loadExceptions: function (exceptions) {
                var store = new Memory({ data: exceptions });
                var dataStore = new ObjectStore({ objectStore: store });
                this.infoGrid.setStore(dataStore);
                this.setQuery("*");
            }
        });
    });
