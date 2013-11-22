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
    "dojo/_base/array",
    "dojo/on",

    "dijit/registry",
    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",

    "hpcc/WsAccess",
    "hpcc/ESPUtil",
    "hpcc/AddMemberToGroupWidget",

    "dojo/text!../templates/MemberOfWidget.html",

    "dijit/form/Button",
    "dijit/Menu",
    "dijit/MenuItem",
    "dijit/MenuSeparator",
    "dijit/PopupMenuItem",
    "dijit/form/DropDownButton",
    "dijit/DropDownMenu"
], function (declare, lang, dom, arrayUtil, on,
                registry, _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
                WsAccess, ESPUtil, AddMemberToGroupWidget,
                template) {
    return declare("MemberOfWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "MemberOfWidget",

        borderContainer: null,
        memberofGrid: null,
        user:null,

        initalized: false,
        loaded: false,

        buildRendering: function (args) {
            this.inherited(arguments);
        },

        postCreate: function (args) {
            this.inherited(arguments);
            this.borderContainer = registry.byId(this.id + "BorderContainer");
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
            if (this.initalized)
                return;
            this.dirtyRows = {};
            this.initalized = true;
            this.initMemberOfGrid();
            this.refreshGrid();
            //this.initContextMenu();

            if (params.username) {
                this.user = params.username;
                this.memberofGrid.set("query", {
                    username: this.user
                 });
            }
        },

        /*getTitle: function () {
            return "Member Of";
        },

        addMenuItem: function (menu, details) {
            var menuItem = new MenuItem(details);
            menu.addChild(menuItem);
            return menuItem;
        },

        initContextMenu:function(){
            var context = this;
            var pMenu = new Menu({
                targetNodeIds: [this.grid.id]
            });
             this.menuAdd = this.addMenuItem(pMenu, {
                label: "Add",
                onClick: function () { context._onAdd(); }
            });
            this.menuDelete = this.addMenuItem(pMenu, {
                label: "Delete",
                onClick: function () { context._onDelete(); }
            });
        },*/

        initMemberOfGrid: function () {
            var context = this;
            var store = new WsAccess.GroupsStore();
            this.memberofGrid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
                allowSelectAll: false,
                deselectOnRefresh: false,
                store: store,
                 columns: {
                    check: selector({
                        width: 1,
                        label: " "
                    },"checkbox"),
                    name: {
                        label: "Group Name", width: 180, sortable: true,
                        formatter: function (Wuid, row) {
                            var wu = row.name === "DFUserver" ? ESPDFUWorkunit.Get(Wuid) : ESPWorkunit.Get(Wuid);
                            //return "<a href='#' class='" + context.id + "WuidClick'>" + Wuid + "</a>";
                        },
                         canEdit: function(rowData, value) {
                             return value != 10;
                        }
                    }
                }
            },

            this.id + "MemberOfGrid");
            this.memberofGrid.on("dgrid-datachange", function (evt) {
                var context = this;
                var rowID = evt.rowId;
                var fieldThatChanged = evt.cell.column.field;
                var newValue = evt.value;
                context.dirtyRows[evt.rowId] = {
                    fieldThatChanged: evt.cell.column.field,
                    newValue: evt.value
                };
            });

            this.memberofGrid.onSelectionChanged(function (event) {
                context.refreshActionState();
            });
            this.memberofGrid.onContentChanged(function (event) {
                context.refreshActionState();
            });

            this._onRefresh();
            this.refreshActionState();

            this.memberofGrid.set("noDataMessage", "<span class='dojoxGridNoData'>Zero Groups.</span>");
            this.memberofGrid.startup();
            this.refreshActionState();
        },

        /*createDetail: function (id, row, params) {
            if (row.Server === "DFUserver") {
                return new DFUWUDetailsWidget.fixCircularDependency({
                    id: id,
                    title: row.ID,
                    closable: true,
                    hpcc: {
                        params: {
                            Wuid: row.ID
                        }
                    }
                });
            }
            return new MemberOfWidget({
                id: id,
                title: row.Wuid,
                closable: true,
                hpcc: {
                    params: {
                        Wuid: row.Wuid
                    }
                }
            });
        },*/

        /*buildFilter: function(){
            var menu = new DropDownMenu({ style: "display: none;"});
            var menuItem1 = new MenuItem({
                label: "Save",
                onClick: function(){ alert('save'); }
            });
            menu.addChild(menuItem1);

            var menuItem2 = new MenuItem({
                label: "Cut",
                onClick: function(){ alert('cut'); }
            });
            menu.addChild(menuItem2);

            var button = new DropDownButton({
                label: "Filter",
                name: "programmatic2",
                dropDown: menu,
                id: "progButton"
            }, this.id + "FilterNode");
        },
*//*
        _onAdd: function (event) {
            //var firstTab = null;
            var tab = this.ensurePane(this.id + "_" + this.user, {
                Username: this.user
            });

            if (i == 0) {
                firstTab = tab;
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
                var context = this;
                WsAccess.UserGroupEditInput(this.user, "Deschedule", {
                    load: function (response) {
                        context.refreshGrid(response);
                    }
                });
        },*/



        _onDelete: function (event) {
                var context = this;
                var selection = this.grid.getSelected();
                WsWorkunits.WUAction(selection, "Deschedule", {
                    load: function (response) {
                        context.refreshGrid(response);
                    }
                });
        },

        _onRefresh:function(){
            this.refreshGrid();
        },

        /*_onDelete: function (params){
            var selections = this.grid.getSelected();
            if (confirm('Delete this user from selected group?')) {
                var context = this;
                for (var i = selections.length - 1; i >= 0; --i) {
                    WsAccess.UserGroupEdit({
                        request:{
                            action: "delete",
                            groupnames: selections[i].name,
                            username: this.user
                        }
                    }).then(function (response) {
                    if(lang.exists("UserGroupEditResponse.retmsg", response)){
                        dojo.publish("hpcc/brToaster", {
                            message: "<p>" + response.UserGroupEditResponse.retmsg + "</p>",
                            type: "error",
                            duration: -1
                        });
                    }
                    });
                }
            }
            setTimeout(this.refreshGrid(), 2000);
        },
*/
        _onDelete: function (event) {
            if (confirm('Delete this user from selected group?')) {
                var context = this;

            }
        },

        /*_onAdd:function(){
            var tab = this.ensurePane(this.id + "_" + this.user, {
                Username: this.user
            });

        },*/

         _onAdd: function (event){
            registry.byId(this.id + "AddMemberDialog").show();
        },

        refreshGrid: function (args) {
            var context = this;
            this.memberofGrid.set("query", {
                username: this.user
            });
        },

        refreshActionState: function (selection) {
            var selection = this.memberofGrid.getSelected();
            var hasSelection = selection.length;
            registry.byId(this.id + "Save").set("disabled", !hasSelection);
        }
    });
});