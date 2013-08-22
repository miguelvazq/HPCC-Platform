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
    "dojo/_base/array",
    "dojo/on",

    "dijit/form/Button",
    "dijit/Menu",
    "dijit/MenuItem",
    "dijit/MenuSeparator",
    "dijit/PopupMenuItem",
    "dijit/form/DropDownButton",
    "dijit/DropDownMenu",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",

    "hpcc/GridDetailsWidget",
    "hpcc/ESPWorkunit",
    "hpcc/ESPDFUWorkunit",
    "hpcc/WsWorkunits",
    "hpcc/WUDetailsWidget",
    "hpcc/DFUWUDetailsWidget",
    "hpcc/ESPUtil"

], function (declare, lang, arrayUtil, on,
                Button, Menu, MenuItem, MenuSeparator, PopupMenuItem, DropDownButton, DropDownMenu,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
                GridDetailsWidget, ESPWorkunit, ESPDFUWorkunit, WsWorkunits, WUDetailsWidget, DFUWUDetailsWidget, ESPUtil) {
    return declare("EventScheduleWorkunitWidget", [GridDetailsWidget], {

        gridTitle: "Event Scheduled Workunits",
        idProperty: "Wuid",

        init: function (params) {
            if (this.initalized)
                return;
            this.initalized = true;
            this.refreshGrid();
            this._refreshActionState();
            this.initContextMenu();
        },

        getTitle: function () {
            return "Scheduled Workunits";
        },

        addMenuItem: function (menu, details) {
            var menuItem = new MenuItem(details);
            menu.addChild(menuItem);
            return menuItem;
        },

        initContextMenu:function(){
            var context = this;
            var pMenu = new Menu({
                targetNodeIds: [this.grid.id ]
            });
             this.menuProtect = this.addMenuItem(pMenu, {
                label: "Open",
                onClick: function () { context._onOpen(); }
            });
            this.menuOpen = this.addMenuItem(pMenu, {
                label: "Deschedule",
                onClick: function () { context._onDeschedule(); }
            });
        },

        createGrid: function (domID) {
            var context = this;
            this.deschedule = new Button({
                label: "Deschedule",
                onClick: function (event) {
                    context._onDeschedule();
                }
            }, this.id + "ContainerNode");

            var retVal = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
                allowSelectAll: true,
                deselectOnRefresh: false,
                store: WsWorkunits.CreateEventScheduleStore(),
                columns: {
                    col1: selector({ width: 27, selectorType: 'checkbox' }),
                    Wuid: {
                        label: "Workunit", width: 180, sortable: true,
                        formatter: function (Wuid, row) {
                            var wu = row.Server === "DFUserver" ? ESPDFUWorkunit.Get(Wuid) : ESPWorkunit.Get(Wuid);
                            return "<a href='#' class='" + context.id + "WuidClick'>" + Wuid + "</a>";
                        }

                    },
                    Cluster: { label: "Cluster", width: 108, sortable: true },
                    JobName: { label: "Jobname", sortable: true },
                    EventName: { label: "Event Name", width: 90, sortable: true },
                    EventText: { label: "Event Text", sortable: true }
                    
                }
            }, domID);

            var context = this;
            on(document, "." + this.id + "WuidClick:click", function (evt) {
                if (context._onRowDblClick) {
                    var row = retVal.row(evt).data;
                    context._onRowDblClick(row);
                }
            });
            return retVal;
        },

        createDetail: function (id, row, params) {
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
            return new WUDetailsWidget({
                id: id,
                title: row.Wuid,
                closable: true,
                hpcc: {
                    params: {
                        Wuid: row.Wuid
                    }
                }
            });
        },

        buildFilter: function(){
            
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

        _onDeschedule: function (event) {
            if (confirm('Deschedule selected workunits?')) {
                var context = this;
                var selection = this.grid.getSelected();
                WsWorkunits.WUAction(selection, "Deschedule", {
                    load: function (response) {
                        context.refreshGrid(response);
                    }
                });
            }
        },

        refreshGrid: function (args) {
            var context = this;
            this.grid.set("query", {
            });
        },

        refreshActionState: function (selection) {
            this.inherited(arguments);
            this.deschedule.set("disabled", !selection.length);
        }
    });
});
