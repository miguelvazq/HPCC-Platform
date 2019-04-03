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
    "src/ESPRequest",
    "src/WsTopology",
    "src/Utility",
    "src/ESPUtil",
    "hpcc/DelayLoadWidget",
    "hpcc/RequestInformationWidget",
    "hpcc/MachineInformationWidget",
    "hpcc/IFrameWidget"
], function (declare, lang, i18n, nlsHPCC, arrayUtil, on, dom, domClass, domConstruct,
    registry, Button, ToolbarSeparator, Dialog, TextBox,
    tree, selector,
    GridDetailsWidget, ESPPreflight, ESPRequest, WsTopology, Utility, ESPUtil, DelayLoadWidget, RequestInformationWidget, MachineInformationWidget, IFrameWidget) {
    return declare("SystemServersQueryWidget", [GridDetailsWidget, ESPUtil.FormHelper], {
        i18n: nlsHPCC,

        gridTitle: nlsHPCC.title_SystemServers,
        idProperty: "__hpcc_id",
        machineFilter: null,
        machineFilterLoaded: null,

        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;

            this._refreshActionState();
            this.refreshGrid();

            this.machineFilter.disable(true);

            this.machineFilter.on("apply", function (evt) {
                var selection = context.grid.getSelected();
                context.filter._onSubmitRequest(selection);
            });

            dojo.destroy(this.id + "Open");
            this.refreshActionState();
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id === this.id + "_Grid") {
                    this.refreshGrid()
                } else if (currSel.id === this.systemServersQueryWidgetIframeWidget.id && !this.systemServersQueryWidgetIframeWidget.initalized) {
                    this.systemServersQueryWidgetIframeWidget.init({
                        src: ESPRequest.getBaseURL("WsTopology") + "/TpServiceQuery?Type=ALLSERVICES"
                    });
                } else {
                    currSel.init(currSel.params);
                }
            }
        },

        _onRowDblClick: function (item) {
            var nodeTab = this.ensureLogsPane(item.Name, {
                params: item,
                ParentName: item.Parent.Name,
                LogDirectory: item.Parent.LogDirectory,
                NetAddress: item.Netaddress,
                OS: item.OS,
                newPreflight: true
            });
            this.selectChild(nodeTab);
        },

        postCreate: function (args) {
            var context = this;
            this.inherited(arguments);
            this.openButton = registry.byId(this.id + "Open");
            this.refreshButton = registry.byId(this.id + "Refresh");
            this.configurationButton = registry.byId(this.id + "Configuration");

            this.machineFilter = new MachineInformationWidget({});

            this.configurationButton = new Button({
                label: "Open Configuration",
                onClick: function(event) {
                    context._onOpenConfiguration()
                }
            });

            this.machineFilter.placeAt(this.openButton.domNode, "after");
            this.configurationButton.placeAt(this.openButton.domNode, "after");

            new ToolbarSeparator().placeAt(this.machineFilter.domNode, "before");

            this.machineFilter.machineForm.set("style", "width:500px;");
            dojo.destroy(this.id + "Open");

            this.systemServersQueryWidgetIframeWidget = new IFrameWidget({
                id: this.id + "_SystemServersQueryWidgetIframeWidget",
                title: "Clusters Processes (legacy)",
                style: "border: 0; width: 100%; height: 100%"
            });
            this.systemServersQueryWidgetIframeWidget.placeAt(this._tabContainer, "last");
        },

        createGrid: function (domID) {
            var context = this;
            var retVal = new declare([ESPUtil.Grid(true, true, false, true)])({
                store: ESPPreflight.CreateSystemServersStore(),
                columns: {
                    col1: selector({
                        width: 20,
                        selectorType: 'checkbox'
                    }),
                    Configuration: {
                        label: this.i18n.Configuration,
                        renderHeaderCell: function (node) {
                            node.innerHTML = Utility.getImageHTML("configuration.png", context.i18n.Configuration);
                        },
                        width: 10,
                        sortable: false,
                        formatter: function (clusterType) {
                            if (clusterType === true) {
                                return "<a href='#' />" + Utility.getImageHTML("configuration.png", context.i18n.Configuration) + "</a>";
                            }
                            return "";
                        }
                    },
                    Name: tree({
                        formatter: function (_name, row) {
                            var img = "";
                            var name = _name;
                            if (row.type === "clusterProcess") {
                                img = Utility.getImageHTML("server.png");
                                name = row.Type + " - " + _name;
                            } if (row.type === "machine") {
                                img = Utility.getImageHTML("machine.png");
                                name = "<a href='#' class='dgrid-row-url'>" + row.Netaddress + " - " + _name + "</a>";
                            }
                            return img + "&nbsp;" + name;
                        },
                        collapseOnRefresh: false,
                        label: this.i18n.Name,
                        sortable: true,
                        width: 150
                    }),
                    Domain: {
                        label: this.i18n.Domain,
                        sortable: false,
                        width: 100
                    },
                    Platform: {
                        label: this.i18n.Platform,
                        sortable: false,
                        width: 75
                    },
                    ProcessNumber: {
                        label: this.i18n.SlaveNumber,
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

            retVal.on("dgrid-select", function (event) {
                var selection = context.grid.getSelected();
                for (var i = selection.length - 1; i >= 0; --i) {
                    if (selection[i].Component) {
                        context.machineFilter.disable(true);
                    }  else {
                        context.machineFilter.disable(false);
                    }
                }
            });

            retVal.on("dgrid-deselect", function (event) {
                var selection = context.grid.getSelected();
                if (selection.length === 0) {
                    context.machineFilter.disable(true);
                } else {
                    context.machineFilter.disable(false);
                }
            });

            retVal.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = retVal.row(evt).data;
                    context._onRowDblClick(item);
                }
            });

            retVal.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = retVal.row(evt).data;
                    context._onRowDblClick(item);
                }
            });

            retVal.on(".dgrid-cell:click", function(evt){
                var cell = retVal.cell(evt)
                console.log(cell)
            });

            retVal.onSelectionChanged(function (event) {
                context.refreshActionState();
            });

            return retVal;
        },

        _onOpen: function (evt) {
            var selections = this.grid.getSelected();
            var firstTab = null;
            for (var i = 0; i < selections.length; ++i) {
                var tab = this.ensureLogsPane(selections[i], {
                    Node: selections[i]
                });
                if (i === 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onOpenConfiguration: function (event) {
            var context = this;
            var selections = this.grid.getSelected();
            var firstTab = null;
            for (let i = 0; i < selections.length; ++i) {
                WsTopology.TpGetComponentFile({
                    request: {
                        FileType: "cfg",
                        CompType: selections[i].Component,
                        CompName: selections[i].Name,
                        Directory: selections[i].Directory,
                        OsType: selections[i].OS,
                    }
                }).then(function(response){
                    var tab = context.ensureConfigurationPane(selections[i].Component + "_" + selections[i].Name , {
                        Component: selections[i].Component,
                        Name: selections[i].Name,
                        Usergenerated: response
                    });
                });
            }
        },

        _onRefresh: function () {
            this.refreshGrid();
        },

        refreshGrid: function () {
            this.grid.set("query", {
                Type: "ALLSERVICES",
            });
        },

        refreshActionState: function () {
            var selection = this.grid.getSelected();
            var isCluster = false;
            var isNode = false;

            for (var i = 0; i < selection.length; ++i) {
                if (selection[i] && selection[i].type === "clusterProcess") {
                    isCluster = true;
                    isNode = false;
                } else {
                    isCluster = false;
                    isNode = true;
                }
            }

            this.openButton.set("disabled", !isNode);
            this.configurationButton.set("disabled", !isCluster);

        },

        ensureConfigurationPane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                var context = this;
                retVal = new DelayLoadWidget({
                    id: id,
                    title: "<b>" + params.Component + "</b>: " + params.Name + " " + context.i18n.Configuration,
                    closable: true,
                    delayWidget: "ECLSourceWidget",
                    params: params

                });
                this.addChild(retVal, "last");
            }
            return retVal;
        },

        ensureLogsPane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                var context = this;
                retVal = new DelayLoadWidget({
                    id: id,
                    title: "<b>" + params.ParentName + "</b>: " + params.NetAddress,
                    closable: true,
                    delayWidget: "LogWidget",
                    params: params

                });
                this.addChild(retVal, "last");
            }
            return retVal;
        }
    });
});