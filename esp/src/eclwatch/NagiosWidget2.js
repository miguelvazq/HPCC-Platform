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
    "dojo/i18n",
    "dojo/i18n!./nls/hpcc",
    "dojo/_base/array",
    "dojo/on",
    "dojo/dom-class",

    "dgrid/tree",
    "dgrid/selector",

    "hpcc/GridDetailsWidget",
    "hpcc/ws_machine",
    "hpcc/ESPWorkunit",
    "hpcc/DelayLoadWidget",
    "hpcc/ESPUtil"

], function (declare, lang, i18n, nlsHPCC, arrayUtil, on, domClass,
                tree, selector,
                GridDetailsWidget, WsMachine, ESPWorkunit, DelayLoadWidget, ESPUtil) {
    return declare("NagiosWidget2", [GridDetailsWidget], {
        i18n: nlsHPCC,

        gridTitle: "Nagios",
        idProperty: "calculatedID",

        //alert: null,

        init: function (params) {
            if (this.inherited(arguments))
                return;
            this._refreshActionState();
            //this.alert = WsMachine.Get(this.idProperty);
        },

        createGrid: function (domID) {
            this.store = WsMachine.CreateNagiosStore();
            this.store.mayHaveChildren = function (item) {
                if (item.StatusReports.StatusReport) {
                    return true;
                }   
                return false;
            };
            this.store.getChildren = function (parent, options) {
                return context.store.query({__hpcc_parentName: parent.ComponentType});
            };
            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,
                columns: {
                    ComponentType: tree({
                        label: "Name", sortable: true,
                        formatter: function (Name, row) {
                            switch (row.Status) {
                                /*case "Normal1":
                                    return dojoConfig.getImageHTML("nodata.png") + "&nbsp;<a href='#' class='dgrid-row-url'>" + Name + "</a>";*/
                                case "Normal":
                                    return dojoConfig.getImageHTML("normal.png") + "&nbsp;<a href='#' class='dgrid-row-url'>" + Name + "</a>";
                                case "Warning":
                                    return dojoConfig.getImageHTML("warning.png") + "&nbsp;<a href='#' class='dgrid-row-url'>" + Name + "</a>";
                                case "Error":
                                    return dojoConfig.getImageHTML("error.png") + "&nbsp;<a href='#' class='dgrid-row-url'>" + Name + "</a>";
                            }
                            return "";
                        }
                    }),
                    EndPoint: {label: "End Point", width: 172, sortable: true},
                    TimeReportedStr: {label: "Time Reported", width: 172, sortable: true},
                    /*Status: { label: this.i18n.Severity, width: 72, sortable: true,
                        renderCell: function (object, value, node, options) {
                            switch (value) {
                                case "Error":
                                    domClass.add(node, "ErrorCell");
                                    break;
                                case "Warning":
                                    domClass.add(node, "WarningCell");
                                    break;
                            }
                            node.innerText = value;
                        }
                    }*/
                }
            }, domID);

            var context = this;
            retVal.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var row = context.grid.row(evt).data;
                    context._onRowDblClick(row);
                }
            });
            return retVal;
        },

        getDetailTitle: function (row, params) {
            return "row.Name";
        },

        createDetail: function (id, row) {
            if (lang.exists("IsSuperFile", row) && row.IsSuperFile) {
                return new DelayLoadWidget({
                    id : id,
                    title: row.Name,
                    closable: true,
                    delayWidget: "SFDetailsWidget",
                    hpcc: {
                        type: "SFDetailsWidget",
                        params: {
                            Name: row.Name
                        }
                    }
                });
            } else {
                return new DelayLoadWidget({
                    id: id,
                    title: row.Name,
                    closable: true,
                    delayWidget: "LFDetailsWidget",
                    hpcc: {
                        type: "LFDetailsWidget",
                        params: {
                            NodeGroup: row.FileCluster,
                            Name: row.Name
                        }
                    }
                });
            }
        },

        refreshGrid: function (request) {
            var context = this;

            WsMachine.GetComponentStatus({
                request: {}
            }).then(function (response) {
                var results = [];
                if (lang.exists("GetComponentStatusResponse.ComponentStatusList.ComponentStatus", response)) {
                    results = response.GetComponentStatusResponse.ComponentStatusList.ComponentStatus;
                }
                /*context.store.setData(results);
                context.grid.set("query", { __hpcc_parentName: "" });*/
                //context.grid.refresh();
                arrayUtil.forEach(results, function (row, idx) {
                        row.calculatedID = idx;
                    });
                    context.store.setData(results);
                    context.grid.set("query", { __hpcc_parentName: "" });
            });
        }
    });
});