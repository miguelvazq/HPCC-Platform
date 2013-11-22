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
    "hpcc/OperationPermissionsWidget",

    "dojo/text!../templates/ResourcePermissionsWidget.html",

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
                _TabContainerWidget, ESPBase, WsAccess, ESPUtil, OperationPermissionsWidget,
                template) {
    return declare("ResourcePermissionsWidget", [_TabContainerWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "ResourcePermissionsWidget",

        borderContainer: null,
        resourcePermissionsTab: null,
        resourcePermissionsGrid: null,

        initalized: false,
        loaded: false,

        buildRendering: function (args) {
            this.inherited(arguments);
        },

        postCreate: function (args) {
            this.inherited(arguments);
            this.borderContainer = registry.byId(this.id + "BorderContainer");
            this.resourcePermissionsTab = registry.byId(this.id + "_ResourcePermissions");
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
            this.initResourcePermissionsGrid();
            this.selectChild(this.resourcePermissionsTab, true);
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id == this.resourcePermissionsTab.id) {
                } else {
                    currSel.init(currSel.params);
                }
            }
        },

        initResourcePermissionsGrid: function () {
            var context = this;
            var store = new WsAccess.Permissions();
            this.resourcePermissionsGrid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
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
                    basedn: {
                        width: 27,
                        label: "BaseDN"
                    },
                    rtype: {
                        width: 27,
                        label: "Rtype"
                    }
                },
            },

            this.id + "ResourcePermissionsGrid");
          var context = this;
            this.resourcePermissionsGrid.set("noDataMessage", "<span class='dojoxGridNoData'>No User Information Available.</span>");
            this.resourcePermissionsGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.resourcePermissionsGrid.row(evt).data;
                    context._onRowDblClick(item.name.split(" ").join(""),item.basedn,item.rtype);
                }
            });
            /*this.PermissionsGrid.on(".dgrid-row:contextmenu", function (evt) {
                if (context._onRowContextMenu) {
                    var item = context.PermissionsGrid.row(evt).data;
                    var cell = context.PermissionsGrid.cell(evt);
                    var colField = cell.column.field;
                    var mystring = "item." + colField;
                    context._onRowContextMenu(item, colField, mystring);
                }
            });*/
            this.resourcePermissionsGrid.onSelectionChanged(function (event) {
                context.refreshActionState();
            });
            this.resourcePermissionsGrid.onContentChanged(function (event) {
                context.refreshActionState();
            });
            this.resourcePermissionsGrid.startup();
            this.refreshActionState();
        },

        //  Hitched actions  ---
        _onRowDblClick: function (name,basedn,rtype) {
            var wuTab = this.ensurePane(this.id + "_" + name, {
                Name: name,
                BaseDN: basedn,
                Rtype: rtype
            });
            this.selectChild(wuTab);
        },

        _onOpen: function (event) {
            var selections = this.resourcePermissionsGrid.getSelected();
            var firstTab = null;
            for (var i = selections.length - 1; i >= 0; --i) {
                var nameClean = selections[i].name.split(" ").join("");
                var tab = this.ensurePane(this.id + "_" + nameClean, {
                    Name: nameClean,
                    BaseDN: selections[i].basedn,
                    Rtype: selections[i].rtype
                });
                if (i == 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onRefresh:function(){
            this.resourcePermissionsGrid.set("query", {
                Name: "*"
            });
        },

        refreshActionState: function () {
            var selection = this.resourcePermissionsGrid.getSelected();
            var hasSelection = selection.length;
            //registry.byId(this.id + "OpenPermissions").set("disabled", !hasSelection);
        },

        ensurePane: function (id, params) {
            var retVal = registry.byId(id);
            if (!retVal) {
                var context = this;
                retVal = new OperationPermissionsWidget({
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
