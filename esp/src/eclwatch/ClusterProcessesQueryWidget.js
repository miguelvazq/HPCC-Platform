define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/i18n",
    "dojo/i18n!./nls/hpcc",
    "dojo/_base/array",
    "dojo/on",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-construct",

    "dijit/registry",
    "dijit/form/Button",
    "dijit/ToolbarSeparator",
    "dijit/Dialog",
    "dijit/form/TextBox",

    "dgrid/tree",
    "dgrid/selector",

    "hpcc/GridDetailsWidget",
    "src/ESPPreflight",
    "src/WsTopology",
    "src/WsESDLConfig",
    "src/Utility",
    "hpcc/DelayLoadWidget",
    "src/ESPUtil",
    "hpcc/DynamicESDLDefinitionQueryWidget",
    "hpcc/TargetSelectWidget",
    "hpcc/DelayLoadWidget",
], function (declare, lang, i18n, nlsHPCC, arrayUtil, on, dom, domClass, domConstruct,
    registry, Button, ToolbarSeparator, Dialog, TextBox,
    tree, selector,
    GridDetailsWidget, ESPPreflight, WsTopology, WsESDLConfig, Utility, DelayLoadWidget, ESPUtil, DynamicESDLDefinitionQueryWidget, TargetSelectWidget, DelayLoadWidget) {
    return declare("SystemServersQueryWidget", [GridDetailsWidget, ESPUtil.FormHelper], {
        i18n: nlsHPCC,

        gridTitle: nlsHPCC.title_Preflight,
        idProperty: "__hpcc_id",

        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;

            this._refreshActionState();
            this.refreshGrid();

            ESPUtil.MonitorVisibility(this.gridTab, function (visibility) {
                if (visibility) {
                    context.refreshGrid();
                }
            });
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id === this.id + "_Grid") {
                    this.refreshGrid()
                } else if (currSel.id === this.definitionQueryWidget.id && !this.definitionQueryWidget.initalized) {
                    this.definitionQueryWidget.init({
                        firstLoad: true
                    });
                } else {
                    currSel.init(currSel.params);
                }
            }
        },

        _onRowDblClick: function (binding) {
            var bindingTab = this.ensurePane(binding.Name, {
                Binding: binding
            });
            this.selectChild(bindingTab);
        },

        postCreate: function (args) {
            var context = this;
            this.inherited(arguments);
            this.openButton = registry.byId(this.id + "Open");
            this.refreshButton = registry.byId(this.id + "Refresh");

            // this.definitionQueryWidget = new DynamicESDLDefinitionQueryWidget({
            //     id: this.id + "_DynamicESDLDefinitionQueryWidget",
            //     title: nlsHPCC.title_Definitions
            // });
            // this.definitionQueryWidget.placeAt(this._tabContainer, "last");
        },

        createGrid: function (domID) {
            var context = this;

            // this.store.mayHaveChildren = function (item) {
            //     return item.children;
            // };

            // this.store.getChildren = function (parent, options) {
            //     return this.query({
            //         __hpcc_parentName: parent.__hpcc_id
            //     }, options);
            // };
            var retVal = new declare([ESPUtil.Grid(true, true, false, true)])({
                store: ESPPreflight.CreateClusterProcessStore(),
                columns: {
                    col1: selector({
                        width: 30,
                        selectorType: 'checkbox',
                        disabled: function (item) {
                            if (item.type === "clusterType") {
                                return true;
                            }
                            return false;
                        }
                    }),
                    Configuration: {
                        label: this.i18n.Configuration,
                        renderHeaderCell: function (node) {
                            node.innerHTML = Utility.getImageHTML("configuration.png", "Open Configuration File");
                        },
                        width: 14,
                        sortable: false,
                        formatter: function (clusterType) {
                            if (clusterType === true) {
                                return Utility.getImageHTML("configuration.png");
                            }
                            return "";
                        }
                    },
                    Name: tree({
                        formatter: function (_name, row) {
                            var img = "";
                            var name = _name;
                            if (row.type === "clusterType") {
                                img = Utility.getImageHTML("cluster.png");
                                name = "<b>" + _name + "</b>";
                            } if (row.type === "machine") {
                                img = Utility.getImageHTML("machine.png");
                                name = "<a href='#' class='dgrid-row-url'>" + _name + "</a>";
                            }
                            return img + "&nbsp;" + name;
                        },
                        collapseOnRefresh: false,
                        label: this.i18n.Name,
                        sortable: false,
                        width: 200,
                        unhidable: true
                    }),
                    Component: {
                        label: this.i18n.Component,
                        sortable: false,
                        width: 200
                    },
                    Domain: {
                        label: this.i18n.Domain,
                        sortable: false,
                        width: 200
                    },
                    Platform: {
                        label: this.i18n.Platform,
                        sortable: false,
                        width: 100
                    },
                    Directory: {
                        label: this.i18n.Directory,
                        sortable: false,
                        width: 200
                    },
                    LogDirectory: {
                        label: this.i18n.LogDirectory,
                        sortable: false,
                        width: 200
                    }
                }
            }, domID);

            retVal.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = retVal.row(evt).data;
                    context._onRowDblClick(item);
                }
            });

            retVal.on(".dgrid-row:dblclick", function (evt) {
                evt.preventDefault();
                context.grid.refresh()
            });

            retVal.onSelectionChanged(function (event) {
                // var selection = retVal.getSelected();
                // if (selection.length > 0) {
                //     context.deleteButton.set("disabled", false);
                // } else {
                //     context.deleteButton.set("disabled", true);
                // }
            });

            return retVal;
        },

        _onRefresh: function () {
            this.refreshGrid();
        },

        refreshGrid: function () {
            // var context = this;
            // WsTopology.TpClusterQuery({
            //     request: {
            //         Type: "ROOT"
            //     }
            // }).then(function (response) {
            //     var results = [];
            //     var newRows = [];
            //     var parents = [
            //         {Name: "Cluster Processes", type: "cluster", results: []}
            //     ]

            //     if (lang.exists("TpClusterQueryResponse.TpClusters.TpCluster", response)) {
            //         results = response.TpClusterQueryResponse.TpClusters.TpCluster;
            //         parents[0].results.push.apply(parents[0].results, results);
            //     }

            //     arrayUtil.forEach(parents, function (row, idx) {
            //         lang.mixin(row, {
            //             __hpcc_parentName: null,
            //             __hpcc_id: "ClustersProcesses",
            //             children: true,
            //             type: "clusterType"
            //         });
            //         if (parents[0].results) {
            //             arrayUtil.forEach(parents[0].results, function (clusters, clusterIdx) {
            //                 newRows.push({
            //                     __hpcc_parentName: "ClustersProcesses",
            //                     __hpcc_id: clusters.Name + clusterIdx,
            //                     Name: clusters.Name,
            //                     Component: clusters.Type,
            //                     Directory: clusters.Directory,
            //                     LogDirectory: clusters.LogDirectory,
            //                     Platform: clusters.OS,
            //                     children: true,
            //                     type: "process"
            //                 });
            //                 arrayUtil.forEach(clusters, function(machines, machineIdx){
            //                     newRows.push({
                                    
            //                     });
            //                 })
            //             });
            //         }
            //     });

            //     arrayUtil.forEach(newRows, function (newRow) {
            //         parents.push(newRow);
            //     });
            //     console.log(parents)
            //     context.store.setData(parents);
            //     context.grid.set("query", {
            //         __hpcc_parentName: null
            //     });
            // });
            this.grid.set("query", {
                id: "*",
            });
        },

        // ensurePane: function (id, params) {
        //     id = this.createChildTabID(id);
        //     var retVal = registry.byId(id);
        //     if (!retVal) {
        //         var context = this;
        //         retVal = new DelayLoadWidget({
        //             id: id,
        //             title: params.Binding.Name,
        //             closable: true,
        //             delayWidget: "DynamicESDLDetailsWidget",
        //             params: params.Binding
        //         });
        //         this.addChild(retVal, "last");
        //     }
        //     return retVal;
        // }
    });
});