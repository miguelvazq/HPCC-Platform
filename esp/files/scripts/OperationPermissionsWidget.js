/*##############################################################################
#    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems.
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
############################################################################## */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/request/iframe",
    "dojo/_base/array",
    "dojo/on",

    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/registry",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",
    "dgrid/extensions/Pagination",

    "hpcc/_TabContainerWidget",
    "hpcc/ESPBase",
    "hpcc/WsAccess",
    "hpcc/ESPUtil",
    "hpcc/IndividualPermissionsWidget",

    "dojo/text!../templates/OperationPermissionsWidget.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/Toolbar",
    "dijit/form/Button",
    "dijit/ToolbarSeparator",
    "dijit/form/TextBox",
    "dijit/Dialog"
], function (declare, lang, dom, iframe, arrayUtil, on,
                _TemplatedMixin, _WidgetsInTemplateMixin, registry,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry, Pagination,
                _TabContainerWidget, ESPBase, WsAccess, ESPUtil, IndividualPermissionsWidget,
                template) {
    return declare("OperationPermissionsWidget", [_TabContainerWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "OperationPermissionsWidget",

        borderContainer: null,
        operationPermissionsTab: null,
        operationPermissionsTabLoaded: false,
        operationPermissionsGrid: null,


        initalized: false,
        loaded: false,

        buildRendering: function (args) {
            this.inherited(arguments);
        },

        postCreate: function (args) {
            this.inherited(arguments);
            this.borderContainer = registry.byId(this.id + "BorderContainer");
            this.operationPermissionsTab = registry.byId(this.id + "_OperationPermissions");
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        resize: function (args) {
            this.inherited(arguments);
            this.borderContainer.resize(); //is needed
        },

        layout: function (args) {
            this.inherited(arguments);
        },

        destroy: function (args) {
            this.inherited(arguments);
        },

        init: function (params) {
             if (this.inherited(arguments))
                return;
            this.initalized = true;
            this.initOperationPermissionsGrid();
            this.selectChild(this.operationPermissionsTab, true);

            this.operationPermissionsGrid.set("query",{
                basedn: params.BaseDN,
            });
        },

        initOperationPermissionsGrid: function () {
            var context = this;
            var store = new WsAccess.OperationPermissions();
            this.operationPermissionsGrid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
                allowSelectAll: true,
                deselectOnRefresh: false,
                store: store,
                columns: {
                  check: selector({
                        width: 1,
                        label: " "
                    },"checkbox"),
                    name: {
                        width: 27,
                        label: "Name"
                    },
                    description: {
                        width: 27,
                        label: "Description"
                    }
                },
            },

            this.id + "OperationPermissionsWidgetGrid");
            var context = this;
            this.operationPermissionsGrid.set("noDataMessage", "<span class='dojoxGridNoData'>No Operation Information Available.</span>");
            this.operationPermissionsGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.operationPermissionsGrid.row(evt).data;
                    context._onRowDblClick(item.name.split(" ").join(""),item.basedn,item.rtype);
                }
            });
            this.operationPermissionsGrid.on(".dgrid-row:contextmenu", function (evt) {
                if (context._onRowContextMenu) {
                    var item = context.operationPermissionsGrid.row(evt).data;
                    var cell = context.operationPermissionsGrid.cell(evt);
                    var colField = cell.column.field;
                    var mystring = "item." + colField;
                    context._onRowContextMenu(item, colField, mystring);
                }
            });
            this.operationPermissionsGrid.onSelectionChanged(function (event) {
                context.refreshActionState();
            });
            this.operationPermissionsGrid.onContentChanged(function (event) {
                context.refreshActionState();
            });
            this.operationPermissionsGrid.startup();
            this.refreshActionState();
        },

        //  Hitched actions  ---
        _onRowDblClick: function (name,basedn) {
            var wuTab = this.ensurePane(this.id + "_" + name, {
                Name: name,
                BaseDN: basedn
            });
            this.selectChild(wuTab);
        },

        _onOpen:function(){
            var selections = this.operationPermissionsGrid.getSelected();
            var firstTab = null;
            for (var i = selections.length - 1; i >= 0; --i) {
                var tab = this.ensurePane(this.id + "_" + selections[i].name, {
                    Name: selections[i].name,
                    BaseDN: selections[i].basedn
                });
                if (i == 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        refreshActionState: function () {
            var selection = this.operationPermissionsGrid.getSelected();
            var hasSelection = selection.length;
            registry.byId(this.id + "Open").set("disabled", !hasSelection);
        },

        _onRefresh:function(){
            this.refreshGrid();
        },

        refreshGrid: function (args) {
            this.operationPermissionsGrid.set("query",{
               name: "*"
            });
        },

        ensurePane: function (id, params) {
            var retVal = registry.byId(id);
            if (!retVal) {
                var context = this;
                retVal = new IndividualPermissionsWidget({
                    id: id,
                    title: params.Name,
                    closable: true,
                    params: params
                });
            this.addChild(retVal, 1);
            }
            return retVal;
        }
    });
});
