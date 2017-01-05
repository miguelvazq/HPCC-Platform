/*##############################################################################
#   HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems®.
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
############################################################################## */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/i18n",
    "dojo/i18n!./nls/hpcc",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-form",
    "dojo/dom-attr",
    "dojo/request/iframe",
    "dojo/dom-class",
    "dojo/query",
    "dojo/store/Memory",
    "dojo/store/Observable",

    "dijit/registry",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",

    "hpcc/_TabContainerWidget",
    "hpcc/ESPWorkunit",
    "hpcc/ESPRequest",
    "hpcc/ESPUtil",
    "hpcc/ESPTopology",
    "hpcc/TargetSelectWidget",
    "hpcc/ECLSourceWidget",
    "hpcc/LogWidget",
    "hpcc/WsTopology",
    "hpcc/PreflightTargetClustersWidget",
    "hpcc/FilterDropDownWidget",
/*    "hpcc/SystemServersWidget",
    "hpcc/PreflightClustersWidget",
    "hpcc/PreflightClusterProcessesWidget",*/

    "dojo/text!../templates/PreflightAddWidget.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Form",
    "dijit/form/Textarea",
    "dijit/form/Button",
    "dijit/form/DropDownButton",
    "dijit/form/ValidationTextBox",
    "dijit/Toolbar",
    "dijit/ToolbarSeparator",
    "dijit/TooltipDialog",
    "dijit/TitlePane",
    "dijit/form/TextBox",
    "dijit/Dialog",
    "dijit/form/SimpleTextarea",

    "hpcc/TableContainer"
], function (declare, lang, i18n, nlsHPCC, dom, domConstruct, domForm, domAttr, iframe, domClass, query, Memory, Observable,
                registry,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
                _TabContainerWidget, ESPWorkunit, ESPRequest, ESPUtil, ESPTopology, TargetSelectWidget, ECLSourceWidget, LogWidget, WsTopology, PreflightTargetClustersWidget, FilterDropDownWidget,/* SystemServersWidget, PreflightClustersWidget, PreflightClusterProcessesWidget,*/
                template) {
    return declare("PreflightAddWidget", [_TabContainerWidget], {
        templateString: template,
        baseClass: "PreflightAddWidget",
        i18n: nlsHPCC,

        targetClustersTab: null,
        targetClustersGrid: null,
        clustersTab: null,
        clustersGrid: null,
        systemServersTab: null,
        systemServersGrid: null,

        filter: null,

        postCreate: function (args) {
            this.inherited(arguments);
            this.targetClustersTab = registry.byId(this.id + "_TargetClusters");
            this.clustersTab = registry.byId(this.id + "_Clusters");
            this.systemServersTab = registry.byId(this.id + "_SystemServers");
            this.filter = registry.byId(this.id + "Filter");
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        destroy: function (args) {
            this.inherited(arguments);
        },

        getTitle: function () {
            return this.i18n.title_TopologyDetails;
        },

        //  Hitched actions  ---
        _onRefresh: function (event) {
             this.refreshGrid();
        },

        //  Implementation  ---
        init: function (params) {
            this.initTab();
            this.initTargetClusters();
            this.initClusters();
            this.initSystemServers();
            this.refreshGrid();
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.init) {
                    currSel.init({});
                }
            }
        },

         getFilter: function () {
            var retVal = this.filter.toObject();
            return retVal;
        },

        initTargetClusters: function () {
            var context = this;
            this.store = new ESPTopology.CreatePreflightTargetClusterStore();
            this.targetClustersGrid = new declare([ESPUtil.Grid(true, true)])({
                store: this.store,
                query: this.getFilter(),
                columns: {
                    col1: selector({
                        width: 27,
                        selectorType: 'checkbox'
                    }),
                    Name: {
                        sortable: false,
                        label: "Name"
                    }
                }
            }, this.id + "TargetClustersGrid");

            var context = this;
            this.targetClustersGrid.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.targetClustersGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.targetClustersGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.targetClustersGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.targetClustersGrid.on(".dgrid-row:contextmenu", function (evt) {
                if (context._onRowContextMenu) {
                    var item = context.targetClustersGrid.row(evt).data;
                    var cell = context.targetClustersGrid.cell(evt);
                    var colField = cell.column.field;
                    var mystring = "item." + colField;
                    context._onRowContextMenu(item, colField, mystring);
                }
            });
            this.targetClustersGrid.startup();
        },

        initClusters: function () {
            var context = this;
            this.store = new ESPTopology.CreatePreflightSystemServersStore();
            this.clustersGrid = new declare([ESPUtil.Grid(true, true)])({
                store: this.store,
                query: this.getFilter(),
                columns: {
                    col1: selector({
                        width: 27,
                        selectorType: 'checkbox'
                    }),
                    Name: {
                        width: 25,
                        sortable: false,
                        label: "Name"
                    }
                }
            }, this.id + "ClustersGrid");

            var context = this;
            this.clustersGrid.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.clustersGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.clustersGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.clustersGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.clustersGrid.on(".dgrid-row:contextmenu", function (evt) {
                if (context._onRowContextMenu) {
                    var item = context.clustersGrid.row(evt).data;
                    var cell = context.clustersGrid.cell(evt);
                    var colField = cell.column.field;
                    var mystring = "item." + colField;
                    context._onRowContextMenu(item, colField, mystring);
                }
            });
            this.clustersGrid.startup();
        },

        initSystemServers: function () {
            var context = this;
            this.store = new ESPTopology.CreatePreflightSystemServersStore();
            this.systemServersGrid = new declare([ESPUtil.Grid(true, true)])({
                store: this.store,
                query: this.getFilter(),
                columns: {
                    col1: selector({
                        width: 27,
                        selectorType: 'checkbox'
                    }),
                    Name: {
                        width: 25,
                        sortable: false,
                        label: "Name"
                    }
                }
            }, this.id + "SystemServersGrid");

            var context = this;
            this.systemServersGrid.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.systemServersGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.systemServersGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.systemServersGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.systemServersGrid.on(".dgrid-row:contextmenu", function (evt) {
                if (context._onRowContextMenu) {
                    var item = context.systemServersGrid.row(evt).data;
                    var cell = context.systemServersGrid.cell(evt);
                    var colField = cell.column.field;
                    var mystring = "item." + colField;
                    context._onRowContextMenu(item, colField, mystring);
                }
            });
            this.systemServersGrid.startup();
        },

        updateInput: function (name, oldValue, newValue) {
            var registryNode = registry.byId(this.id + name);
            if (registryNode) {
                registryNode.set("value", newValue);
            }
        },

        refreshGrid: function (clearSelection) {
            this.targetClustersGrid.set("query", this.getFilter());
            if (clearSelection) {
                this.targetClustersGrid.clearSelection();
            }
        },

        refreshActionState: function () {
        }
    });
});