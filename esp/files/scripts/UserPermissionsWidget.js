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
    "dojo/dom-form",
    "dojo/_base/array",

    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dijit/registry",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/editor",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",
    "dgrid/extensions/Pagination",

    "hpcc/GridDetailsWidget",
    "hpcc/ESPBase",
    "hpcc/ESPWorkunit",
    "hpcc/ESPLogicalFile",
    "hpcc/WsAccess",
    "hpcc/ESPUtil"
], function (declare, lang, dom, domForm, arrayUtil,
                _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, Button, registry,
                OnDemandGrid, Keyboard, Selection, selector, editor, ColumnResizer, DijitRegistry, Pagination,
                GridDetailsWidget, ESPBase, ESPWorkunit, ESPLogicalFile, WsAccess, ESPUtil) {
    return declare("UserPermissionsWidget", [GridDetailsWidget], {

        gridTitle: "Permissions",
        idProperty: "ResourceName",

        buildRendering: function (args) {
            this.inherited(arguments);
        },

        init: function (params) {
            if (this.inherited(arguments))
                return;

            this.dirtyRows = {};
            this._onRefresh();
            this._refreshActionState();
        },

        createGrid: function (domID) {
            var context = this;

            this.addButton = new Button({
                label: "Save",
                onClick: function (event) {
                    for (var key in context.dirtyRows) {
                        var row = context.store.get(key);
                        WsAccess.UpdatePermission(context.params.AccountName, {
                            request: row
                        });
                    }
                    context.dirtyRows = {};
                }
            }, this.id + "ContainerNode");

            var retVal = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
                store: this.store,
                columns: {
                    ResourceName: {
                        width: 240,
                        label: "Resource"
                    },
                    PermissionName: {
                        width: 240,
                        label: "Permission"
                    },
                    allow_access: editor({
                        width: 54,
                        editor: "checkbox",
                        autoSave: true,
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Allow<br>Access";
                        }
                    }),
                    allow_read: editor({
                        width: 54,
                        editor: "checkbox",
                        autoSave: true,
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Allow<br>Read</center>";
                        }
                    }),
                    allow_write: editor({
                        width: 54,
                        editor: "checkbox",
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Allow<br>Write</center>";
                        }
                    }),
                    allow_full: editor({
                        width: 54,
                        editor: "checkbox",
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Allow<br>Full</center>";
                        }
                    }),
                    padding: {
                        width:20,
                        label: " "
                    },
                    deny_access: editor({
                        width: 54,
                        editor: "checkbox",
                        autoSave: true,
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Deny<br>Access</center>";
                        }
                    }),
                    deny_read: editor({
                        width: 54,
                        editor: "checkbox",
                        autoSave: true,
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Deny<br>Read</center>";
                        }
                    }),
                    deny_write: editor({
                        width: 54,
                        editor: "checkbox",
                        autoSave: true,
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Deny<br>Write</center>";
                        }
                    }),
                    deny_full: editor({
                        width: 54,
                        editor: "checkbox",
                        autoSave: true,
                        renderHeaderCell: function (node) {
                            node.innerHTML = "<center>Deny<br>Full</center>";
                        }
                    }),
                }
            }, domID);

            retVal.on("dgrid-datachange", function (evt) {
                var context = this;
                var rowID = evt.rowId;
                var fieldThatChanged = evt.cell.column.field;
                var newValue = evt.value;
                context.dirtyRows[evt.rowId] = {
                    fieldThatChanged: evt.cell.column.field,
                    newValue: evt.value
                };
            });
            return retVal;

            this._onRefresh();
            this.refreshActionState();
        },

        createDetail: function (id, row, params) {
        },

        _onRefresh: function (args) {
            var context = this;
            WsAccess.AccountPermissions({
                request: {
                    AccountName:  context.params.AccountName
                }
            }).then(function (response) {
                if (lang.exists("AccountPermissionsResponse.Permissions.Permission", response)) {
                    context.store.setData(response.AccountPermissionsResponse.Permissions.Permission);
                    context.grid.refresh();
                }
            });
        },

        refreshActionState: function (selection) {
            registry.byId(this.id + "Open").set("disabled", true);
        }
    });
});
