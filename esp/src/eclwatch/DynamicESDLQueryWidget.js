/*##############################################################################
#    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems®.
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
    "dojo/topic",

    "dijit/registry",
    "dijit/form/ToggleButton",
    "dijit/ToolbarSeparator",
    "dijit/form/Button",

    "dgrid/tree",
    "dgrid/extensions/ColumnHider",

    "hpcc/GridDetailsWidget",
    "hpcc/WsTopology",
    "hpcc/ESPWorkunit",
    "hpcc/DelayLoadWidget",
    "hpcc/ESPUtil",
    "hpcc/DynamicESDLDetailsWidget"

], function (declare, lang, i18n, nlsHPCC, arrayUtil, on, domClass, topic,
                registry, ToggleButton, ToolbarSeparator, Button,
                tree, ColumnHider,
                GridDetailsWidget, WsTopology, ESPWorkunit, DelayLoadWidget, ESPUtil, DynamicESDLDetailsWidget) {
    return declare("DynamicESDLWidget", [GridDetailsWidget], {
        i18n: nlsHPCC,

        gridTitle: nlsHPCC.DynamicESDL,
        idProperty: "__hpcc_id",

        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;
            this._refreshActionState();
            this.refreshGrid();
        },

        postCreate: function (args) {
            this.inherited(arguments);
            this.detailsWidget = new DynamicESDLDetailsWidget({
                id: this.id + "Details",
                region: "right",
                splitter: true,
                style: "width: 66%",
                minSize: 240
            });
            this.detailsWidget.placeAt(this.gridTab, "last");
        },

        createGrid: function (domID) {
            var context = this;
            this.openButton = registry.byId(this.id + "Open");
            this.bindButton = registry.byId(this.id + "Bind");
            this.bindButton = new Button({
                showLabel: true,
                checked: false,
                //style:{display: "none"},
               /* onChange: function (val) {
                    if (val) {
                        context.viewModeMachines.set("checked", false);
                        context.viewModeServices.set("checked", false);
                        context.viewModeTargets.set("checked", false);
                        context.refreshGrid("Debug");
                    }
                },*/
                label: "Bind"
            }).placeAt(this.openButton.domNode, "after");

            this.store.mayHaveChildren = function (item) {
                if (item.__hpcc_parentName) {
                    return false;
                }
                return true;
            };

            this.store.getChildren = function (parent, options) {
               var retVal =  this.query({__hpcc_parentName: parent.__hpcc_id}, options);
               return retVal;
            };

            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,
                //sort: [{ attribute: "StatusID", descending: true },{ attribute: "Status", descending: true }],
                columns: {
                    StatusID: {label: "", width: 0, sortable: false, hidden: true},
                    Name: tree({
                        label: "Name", sortable: true, width:200,
                        /*formatter: function (Name, row) {
                            switch (row.Status) {
                                case "Normal":
                                    return dojoConfig.getImageHTML("normal.png") + Name;
                                case "Warning":
                                    return dojoConfig.getImageHTML("warning.png") + Name;
                                case "Error":
                                    return dojoConfig.getImageHTML("error.png") + Name;
                            }
                            return "";
                        }*/
                    }),
                    /*Service: {label: "ESP Binding", sortable: false},
                    Port: {label: "Port", sortable: false},
                    Protocol: {label: "Protocol", sortable: false}
                    
                    URL: {label: "URL", width: 200, sortable: false,
                        formatter: function (Name, row) {
                            if (Name) {
                                return "<a href=http://"+Name+" target='_blank'>" + Name + "</a>";
                            } else {
                                return "";
                            }
                        }},
                    EndPoint: {label: "IP", sortable: true, width:140},
                    TimeReportedStr: {label: "Time Reported", width:140, sortable: true},
                    Status: { label: this.i18n.Severity, width: 130, sortable: false,
                        renderCell: function (object, value, node, options) {
                            switch (value) {
                                case "Error":
                                    domClass.add(node, "ErrorCell");
                                    break;
                                case "Warning":
                                    domClass.add(node, "WarningCell");
                                    break;
                                case "Normal":
                                    domClass.add(node, "NormalCell");
                                    break;
                            }
                            node.innerText = value;
                        }*/
                    }
                //}
            }, domID);

            retVal.on("dgrid-select", function (event) {
                var selection = context.grid.getSelected();
                if (selection.length) {
                    context.detailsWidget.init(selection[0]);
                }
            });

            return retVal;
        },

        createDetail: function (id, row, params) {
            return new DelayLoadWidget({
                id: id,
                title: row.__hpcc_displayName,
                closable: true,
                delayWidget: "DynamicESDLDetailsWidget",
                hpcc: {
                    params: row
                }
            });
        },

        refreshGrid: function () {
            var context = this;

            WsTopology.TpServiceQuery({
                    request: {}
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer", response)) {
                        results = response.TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer;
                    }
                    arrayUtil.forEach(results, function (row, idx) {
                        lang.mixin(row, {
                            __hpcc_parentName: null,
                            __hpcc_id: row.Name
                        });

                        arrayUtil.forEach(row.TpBindings.TpBinding, function (tpBinding, idx) {
                            if (tpBinding.ServiceType === 'DynamicESDL') {
                                newRows.push({
                                    __hpcc_parentName: row.Name,
                                    __hpcc_id: row.Name + idx,
                                    __hpcc_type: "ESP Process",
                                    Name: tpBinding.Service,
                                    Port: tpBinding.Port,
                                    Service: tpBinding.Name,
                                    Protocol: tpBinding.Protocol
                                });
                            }
                        });
                    });

                    arrayUtil.forEach(newRows, function (newRow) {
                        results.push(newRow);
                    });

                    context.store.setData(results);
                    context.grid.set("query", {__hpcc_parentName: null });
                });
        }
    });
});
