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
    "dojo/i18n",
    "dojo/i18n!./nls/hpcc",
    "dojo/on",

    "dijit/registry",
    "dijit/form/ToggleButton",
    "dijit/ToolbarSeparator",
    "dijit/layout/ContentPane",

    "dgrid/tree",

    "hpcc/GridDetailsWidget",
    "hpcc/ESPRequest",
    "hpcc/ESPSystemHealth",
    "hpcc/ws_machine",
    "hpcc/DelayLoadWidget",
    "hpcc/ESPUtil"

], function (declare, i18n, nlsHPCC, on,
                registry, ToggleButton, ToolbarSeparator, ContentPane,
                tree,
                GridDetailsWidget, ESPRequest, ESPSystemHealth, WsMachine, DelayLoadWidget, ESPUtil) {
    return declare("SystemHealthWidget", [GridDetailsWidget], {

        i18n: nlsHPCC,
        gridTitle: nlsHPCC.SystemHealth,
        idProperty: "__hpcc_id",

        postCreate: function (args) {
            this.inherited(arguments);
        },

        init: function (params) {
            if (this.inherited(arguments))
                return;

            this.refreshGrid();
        },

        createGrid: function (domID) {
            var context = this;
            this.openButton = registry.byId(this.id + "Open");

            this.store = new ESPSystemHealth.Store();
            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,
                columns: [
                tree({
                        //
                        label: this.i18n.Component,
                        width: 350,
                        collapseOnRefresh: true,
                        shouldExpand: function (row, level, previouslyExpanded) {
                            if (previouslyExpanded !== undefined) {
                                return previouslyExpanded;
                            } else if (level < -1) {
                                return true;
                            }
                            return false;
                        },
                        formatter: function (_id, row) {
                            return "<img src='" + dojoConfig.getImageURL(row.__hpcc_treeItem.ComponentStatus + ".png" ) + "'/>&nbsp;" + row.getLabel();
                        }
                    }),
                { label:"Message", field: "type", sortable: false,width: 150,},
                { label:"Reporter", field: "type", sortable: false, width: 150,},
                { label:this.i18n.Severity, field: "type", sortable: false}
                    // renderCell: function (object, value, node, options) {
                    //     switch (object.__hpcc_treeItem.ComponentStatus) {
                    //         case "Error":
                    //             domClass.add(node, "ErrorCell");
                    //                 break;
                    //                 case "Warning":
                    //             domClass.add(node, "WarningCell");
                    //                 break;
                    //             }
                    //             node.innerText = object.__hpcc_treeItem.ComponentStatus;
                    // }}
                ]
            }, domID);
            return retVal;
        },

        refreshGrid: function (mode) {
            var context = this;
            this.store.refresh(function () {
                context.grid.refresh();
            });
        }
    });
});
