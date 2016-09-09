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
    "dojo/i18n",
    "dojo/i18n!./nls/hpcc",
    "dojo/on",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/_base/lang",

    "dijit/form/CheckBox",
    "dijit/form/TextBox",
    "dijit/form/ValidationTextBox",
    "dijit/registry",
    "dijit/form/ToggleButton",
    "dijit/form/Select",
    "dijit/ToolbarSeparator",
    "dijit/layout/ContentPane",

    "dgrid/tree",
    "dgrid/selector",

    "hpcc/GridDetailsWidget",
    "hpcc/PreflightDetailsWidget",
    "hpcc/ESPRequest",
    "hpcc/ESPTopology",
    "hpcc/TopologyDetailsWidget",
    "hpcc/DelayLoadWidget",
    "hpcc/ESPUtil",
    "hpcc/FilterDropDownWidget",
    "hpcc/ws_machine",

], function (declare, i18n, nlsHPCC, on, dom, domConstruct, lang,
                CheckBox, TextBox, ValidationTextBox, registry, ToggleButton, Select, ToolbarSeparator, ContentPane,
                tree, selector,
                GridDetailsWidget, PreflightDetailsWidget, ESPRequest, ESPTopology, TopologyDetailsWidget, DelayLoadWidget, ESPUtil, FilterDropDownWidget, WsMachine) {
    return declare("TopologyWidget", [GridDetailsWidget], {

        i18n: nlsHPCC,
        gridTitle: nlsHPCC.title_Topology,
        idProperty: "__hpcc_id",
        filter: null,
        filterLoaded: null,

        postCreate: function (args) {
            this.inherited(arguments);
            this.detailsWidget = new TopologyDetailsWidget({
                id: this.id + "Details",
                region: "right",
                splitter: true,
                style: "width: 80%",
                minSize: 240
            });
            this.detailsWidget.placeAt(this.gridTab, "last");
            this.filter = new FilterDropDownWidget();
        },

        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;
            this.detailsWidget.preflightWidget.set("disabled", true);
            this.refreshGrid();

            this.filter.disable(true);

            this.filter.on("apply", function (evt) {
                var selection = context.grid.getSelected();
                var filter = context.getFilter();

                if (selection.length) {
                    for (var i = 0; i < selection.length; ++i) {
                        var TargetClustersClean = "TargetClusters." + [i];
                        var TargetClusterCount = "TargetClusters.itemcount";
                        lang.mixin(filter, {
                            [TargetClustersClean]: selection[i].__hpcc_treeItem.Type + ":" + selection[i].__hpcc_treeItem.Name
                        })
                    }
                }
                WsMachine.GetTargetClusterInfo({
                    request: {
                        [TargetClustersClean]: filter[TargetClustersClean],
                        [TargetClusterCount]: 1000,
                        AutoRefresh:filter.AutoRefresh,
                        MemThreshold:filter.MemThreshold,
                        DiskThreshold:filter.DiskThreshold,
                        CpuThreshold:filter.CpuThreshold,
                        MemThresholdType:filter.MemThreshold,
                        DiskThresholdType:filter.DiskThresholdType,
                        GetProcessorInfo:filter.GetProcessorInfo,
                        GetStorageInfo:filter.GetStorageInfo,
                        LocalFileSystemsOnly:filter.LocalFileSystemsOnly,
                        GetSoftwareInfo:filter.GetSoftwareInfo,
                        DiskThreshold:filter.DiskThreshold,
                        DiskThresholdType:filter.DiskThresholdType,
                        ApplyProcessFilter:filter.ApplyProcessFilter,
                        AddProcessesToFilter: filter.AddtionalProcessesToFilter,
                        cbAutoRefresh: filter.cbAutoRefresh,
                    }
                }).then(function (response) {
                    console.log(filter[TargetClustersClean])
                    if (lang.exists("GetTargetClusterInfoResponse", response)) {
                        if (context.filterLoaded) {
                            var pfTab = context.ensurePane(response.GetTargetClusterInfoResponse.TimeStamp, {
                                params: response.GetTargetClusterInfoResponse
                            });
                            context.selectChild(pfTab);
                        } else {
                            context.detailsWidget.preflightWidget.set("disabled", false);
                            context.detailsWidget.preflightWidget.init(response.GetTargetClusterInfoResponse);
                            context.filterLoaded = true;
                        }
                    }
                });
            });
        },

        createGrid: function (domID) {
            var context = this;
            this.openButton = registry.byId(this.id + "Open");
            this.filter.placeAt(this.openButton.domNode, "after");
            this.filter.filterForm.set("style", "width:600px");
            this.filter.filterDropDown.set("label", this.i18n.MachineInformation);
            this.filter.filterClear.set("disabled", true);

            this.viewModeDebug = new ToggleButton({
                showLabel: true,
                checked: false,
                style:{display: "none"},
                onChange: function (val) {
                    if (val) {
                        context.viewModeMachines.set("checked", false);
                        context.viewModeServices.set("checked", false);
                        context.viewModeTargets.set("checked", false);
                        context.refreshGrid("Debug");
                    }
                },
                label: "Debug"
            }).placeAt(this.openButton.domNode, "after");
            this.viewModeMachines = new ToggleButton({
                showLabel: true,
                checked: false,
                onChange: function (val) {
                    if (val) {
                        context.viewModeDebug.set("checked", false);
                        context.viewModeServices.set("checked", false);
                        context.viewModeTargets.set("checked", false);
                        context.refreshGrid("Machines");
                    }
                },
                label: "Machines"
            }).placeAt(this.openButton.domNode, "after");
            this.viewModeServices = new ToggleButton({
                showLabel: true,
                checked: false,
                onChange: function (val) {
                    if (val) {
                        context.viewModeDebug.set("checked", false);
                        context.viewModeMachines.set("checked", false);
                        context.viewModeTargets.set("checked", false);
                        context.refreshGrid("Services");
                    }
                },
                label: "Services"
            }).placeAt(this.openButton.domNode, "after");
            this.viewModeTargets = new ToggleButton({
                showLabel: true,
                checked: true,
                onChange: function (val) {
                    if (val) {
                        context.viewModeDebug.set("checked", false);
                        context.viewModeMachines.set("checked", false);
                        context.viewModeServices.set("checked", false);
                        context.refreshGrid("Targets");
                    }
                },
                label: "Targets"
            }).placeAt(this.openButton.domNode, "after");

            new ToolbarSeparator().placeAt(this.openButton.domNode, "after");
            new ToolbarSeparator().placeAt(this.viewModeMachines.domNode, "after");

            this.machineInformationDropDown = this.createLabelAndElement("machineinformation", "Machine Information", "Select", this.i18n.MachineInformation, [{ label: this.i18n.MachineInformation, value: "GetMachineInfo", selected: true}])
            this.getProcessorInformation = this.createLabelAndElement("GetProcessorInfo", this.i18n.ProcessorInformation, "CheckBox");
            this.getStorageInformation = this.createLabelAndElement("GetStorageInfo", this.i18n.StorageInformation, "CheckBox");
            this.localFileSystemsOnly = this.createLabelAndElement("LocalFileSystemsOnly", this.i18n.LocalFileSystemsOnly, "CheckBox");
            this.getSoftwareInformation  = this.createLabelAndElement("GetSoftwareInfo", this.i18n.GetSoftwareInformation, "CheckBox");
            this.showProcessesUsingFilter = this.createLabelAndElement("ApplyProcessFilter", this.i18n.ShowProcessesUsingFilter, "CheckBox");
            this.additionalProcessesFilter = this.createLabelAndElement("AddProcessesToFilter", this.i18n.AddtionalProcessesToFilter, "TextBox", this.i18n.AnyAdditionalProcessesToFilter);
            this.autoRefresh = this.createLabelAndElement("cbAutoRefresh", this.i18n.AutoRefresh, "CheckBox");
            this.autoRefreshEvery = this.createLabelAndElement("AutoRefresh", this.i18n.AutoRefreshIncrement, "TextBox", this.i18n.AutoRefreshEvery, 5);
            this.warnifcpuusageisover = this.createLabelAndElement("CpuThreshold", this.i18n.WarnIfCPUUsageIsOver, "TextBox", this.i18n.EnterAPercentage, 95);
            this.warnifavailablememoryisunder = this.createLabelAndElement("MemThreshold", this.i18n.WarnIfAvailableMemoryIsUnder, "TextBox", this.i18n.EnterAPercentageOrMB, 5);
            this.warnifavailablememoryisunderthreshold = this.createLabelAndElement("MemThresholdType", "", "SelectMini", "Threshold", [{ label: "%", value: 0, selected: true}, {label: "MB", value: 1}]);
            this.warnifavailablediskisunder = this.createLabelAndElement("DiskThreshold", this.i18n.WarnIfAvailableDiskSpaceIsUnder, "TextBox", this.i18n.EnterAPercentageOrMB, 5);
            this.warnifdiskspaceisunder = this.createLabelAndElement("DiskThresholdType", "", "SelectMini", "Threshold", [{ label: "%", value: 0, selected: true}, {label: "MB", value: 1}]);

            this.store = new ESPTopology.Store();
            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,
                columns: [
                    selector({
                        width: 18,
                        selectorType: 'checkbox',
                        sortable: false,
                        disabled: function (item) {
                            return false
                        }
                    }),
                    tree({
                        field: "__hpcc_displayName",
                        label: this.i18n.Topology,
                        width: 130,
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
                            return "<img src='" + dojoConfig.getImageURL(row.getIcon()) + "'/>&nbsp;" + row.getLabel();
                        }
                    })
                ]
            }, domID);

            retVal.on("dgrid-select", function (event) {
                var selection = context.grid.getSelected();
                if (selection.length) {
                    context.detailsWidget.init(selection[0]);
                    if (selection[0].__hpcc_parentNode) {
                        context.filter.disable(false);
                    } else {
                        context.filter.disable(true);
                    }
                }
            });
            retVal.on("dgrid-deselect", function (event) {
                var selection = context.grid.getSelected();
                if (selection.length === 0) {
                    context.filter.disable(true);
                } else {
                    context.filter.disable(false);
                }
            });
            return retVal;
        },

        createDetail: function (id, row, params) {
            return new DelayLoadWidget({
                id: id,
                title: row.__hpcc_displayName,
                closable: true,
                delayWidget: "TopologyDetailsWidget",
                hpcc: {
                    params: row
                }
            });
        },

        listenAndDisable: function (state, id) {
            switch (id) {
                case "GetStorageInfo":
                    if (state === false) {
                        dijit.byId("LocalFileSystemsOnly").set("checked", false);
                        dijit.byId("LocalFileSystemsOnly").set("disabled", true);
                    } else if (state === "on") {
                        dijit.byId("GetStorageInfo").set("checked", true);
                        dijit.byId("LocalFileSystemsOnly").set("checked", true);
                        dijit.byId("LocalFileSystemsOnly").set("disabled", false);
                    }
                break;
                case "GetSoftwareInfo":
                    if (state === false) {
                        dijit.byId("ApplyProcessFilter").set("disabled", true);
                        dijit.byId("ApplyProcessFilter").set("checked", false);
                        dijit.byId("AddProcessesToFilter").set("disabled", true);
                    } else {
                        dijit.byId("ApplyProcessFilter").set("disabled", false);
                        dijit.byId("ApplyProcessFilter").set("checked", true);
                        dijit.byId("AddProcessesToFilter").set("disabled", false);
                    }
                break;
                 case "ApplyProcessFilter":
                    if (state === false) {
                        dijit.byId("AddProcessesToFilter").set("disabled", true);
                    } else {
                        dijit.byId("ApplyProcessFilter").set("checked", true);
                        dijit.byId("AddProcessesToFilter").set("disabled", false);
                    }
                break;
                 case "cbAutoRefresh":
                    if (state === false) {
                        dijit.byId("AutoRefresh").set("disabled", true);
                    } else {
                        dijit.byId("cbAutoRefresh").set("checked", true);
                        dijit.byId("AutoRefresh").set("disabled", false);
                    }
            }
        },

        createLabelAndElement: function (id, label, element, placeholder, value) {
            var context = this;
            switch (element) {
                case "CheckBox":
                    var element = new CheckBox ({
                        id: id,
                        name: id,
                        checked: true,
                        title: label,
                        onChange: function (b) {
                            var state = this.get('value');
                            context.listenAndDisable(state, id)
                        }
                    });
                break;
                case "TextBox":
                    var element = new ValidationTextBox ({
                        id: id,
                        name: id,
                        placeholder: placeholder,
                        style: "width: 40%",
                        value: value
                    });
                break;
                case "Select":
                    var element = new Select ({
                        id: id,
                        name: id,
                        placeholder: placeholder,
                        style: "width: 40%",
                        options: value
                    });
                break;
                case "SelectMini":
                    var element = new Select ({
                        id: id,
                        name: id,
                        placeholder: placeholder,
                        class: "miniSelect",
                        options: value
                    });
                break;
            }
            this.filter.tableContainer.domNode.appendChild(
                dojo.create(label ? "div" : "span", {
                    id: this.id + id,
                    innerHTML: label ? "<label for="+ element + " style='float:left;width:40%'>" +  label + ":</label>" : '',
                    style: "vertical-align:middle;padding:2px 0 2px 5px;"
                })
            )
            element.placeAt(this.id + id);
        },

        getFilter: function () {
            var retVal = this.filter.toObject();

            if (retVal.ApplyProcessFilter === "on") {
                lang.mixin(retVal, {
                    ApplyProcessFilter: 1
                });
            } if (retVal.GetProcessorInfo === "on") {
                lang.mixin(retVal, {
                    GetProcessorInfo: 1
                });
            } if (retVal.GetSoftwareInfo === "on") {
                lang.mixin(retVal, {
                    GetSoftwareInfo: 1
                });
            } if (retVal.GetStorageInfo === "on") {
                lang.mixin(retVal, {
                    GetStorageInfo: 1
                });
            } if (retVal.LocalFileSystemsOnly === "on") {
                lang.mixin(retVal, {
                    LocalFileSystemsOnly: 1
                });
            }
            return retVal;
        },

        ensurePane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                retVal = new PreflightDetailsWidget({
                    id: id,
                    title: "Fetched " + params.params.TimeStamp + " <b>("  + params.params.TargetClusterInfoList.TargetClusterInfo[0].Name + ")</b>",
                    closable: true,
                    params: {
                        params: params.params
                    }
                });
                this.detailsWidget.preflightWidget.addChild(retVal, "last");
            }
            return retVal;
        },

        refreshGrid: function (mode) {
            var context = this;
            if (mode) {
                this.store.viewMode(mode);
                this.grid.refresh();
            } else {
                this.store.viewMode("Targets");
                this.store.refresh(function () {
                    context.grid.refresh();
                });
            }
        },

        refreshActionState: function () {

        }
    });
});
