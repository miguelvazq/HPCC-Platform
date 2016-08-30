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
    "dojo/dom-construct",

    "dijit/registry",
    "dijit/form/Button",
    "dijit/ToolbarSeparator",
    "dijit/Dialog",
    "dijit/form/TextBox",

    "hpcc/GridDetailsWidget",
    "hpcc/ESPQuery",
    "hpcc/ESPUtil",

    "dgrid/selector",
    "dgrid/extensions/ColumnHider",

], function (declare, lang, i18n, nlsHPCC, arrayUtil, domConstruct,
                registry, Button, ToolbarSeparator, Dialog, TextBox,
                GridDetailsWidget, ESPQuery, ESPUtil,
                selector, ColumnHider) {
    return declare("PreflightDetailsWidget", [GridDetailsWidget], {
        i18n: nlsHPCC,

        preflightTab: null,
        preflightWidgetLoaded: false,
        gridTitle: "Default Settings",
        idProperty: "__hpcc_id",

        init: function (params) {
            if (this.inherited(arguments))
                return;

            if (params) {
                this.params = params;
                this.gridTab.set("title", "Fetched " + params.TimeStamp + " <b>("  + params.TargetClusterInfoList.TargetClusterInfo[0].Name + ")</b>");
                this.refresh(params);
                this.getColumns(params);
            }
            this.initTab();
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        refresh: function (params) {
            this.refreshGrid(params);
        },

        createGrid: function (domID) {
            var context = this;

            this.openButton = registry.byId(this.id + "Open");
            this.openButton.set("disabled", true);

            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,
                columns: context.getColumns(),
            }, domID);
            return retVal;
        },

        getColumns: function (params) {
            var context = this;
            var dynamicColumns = {
                Location: { label: "Location"},
                Component: { label: "Component"},
                Condition: { label: "Condition"},
                State: { label: this.i18n.State}
            }

            if (params) {
                var finalColumns = params.Columns.Item;
                for (index in finalColumns) {
                    var clean = finalColumns[index].replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'')
                    lang.mixin(dynamicColumns, {
                        [clean] : {"label": finalColumns[index]}
                    })
                }
                context.grid.set("columns", dynamicColumns);
            }
        },

        initTab: function () {
            var context = this;
            var currSel = this.getSelectedChild();
            if (!currSel.initalized) {
                if (currSel.id == this.id && !this.preflightWidgetLoaded) {
                    this.preflightWidget.__hpcc_initalized = true;
                    this.preflightWidgetLoaded = true;
                    this.preflightWidget.init({
                       params: params.params
                    });
                } else if (currSel.init) {
                    currSel.init(this.params);
                }
                currSel.initalized = true;
            }
        },

        refreshGrid: function (params) {
            var context = this;
            var results = [];
            var newRows = [];

            if (params) {
                arrayUtil.forEach(params.TargetClusterInfoList.TargetClusterInfo, function (row, idx) {
                    arrayUtil.forEach(row.Processes.MachineInfoEx, function (setRows, idx) {
                        arrayUtil.forEach(setRows.Storage.StorageInfo, function (dynamicRows, idx) {
                            var cleanColumn = dynamicRows.Description.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'');
                            newRows.push({
                                [cleanColumn]: dynamicRows.PercentAvail
                            })
                        })
                        results.push({
                            Location: setRows.Address + " " + setRows.ComponentPath,
                            Component:setRows.DisplayType + "[" + setRows.ComponentName + "]",
                            Condition: setRows.ComponentInfo.Condition,
                            State: setRows.ComponentInfo.State,
                            UpTime: setRows.UpTime
                        })
                    })
                    results.concat(newRows);
                })
            }

            /*arrayUtil.forEach(results.Storage.StorageInfo, function (row, idx) {
                var cleanColumn = row.Description.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'');
                newRows.push({
                    [cleanColumn]: row.PercentAvail
                });
            })*/

            /*arrayUtil.forEach(results, function (row,idx) {
                lang.mixin(row, {
                    Location: setRows.Address + " " + setRows.ComponentPath,
                    Component:setRows.DisplayType + "[" + setRows.ComponentName + "]",
                    Condition: setRows.ComponentInfo.Condition,
                    State: setRows.ComponentInfo.State,
                    UpTime: setRows.UpTime
                })
            })*/





            /*arrayUtil.forEach(params.TargetClusterInfoList.TargetClusterInfo, function (row, idx) {
                arrayUtil.forEach(row.Processes.MachineInfoEx, function (setRows, idx) {
                    arrayUtil.forEach(setRows.Storage.StorageInfo, function (dynamicRows, idx){
                        var cleanColumn = dynamicRows.Description.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'');
                        results.push({
                            [cleanColumn]: dynamicRows.PercentAvail
                        })
                    });
                });
            });*/
                /*arrayUtil.forEach(results, function (dynamicRows, idx){
                        var cleanColumn = setRows.Storage.StorageInfo[idx].Description.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'');

                        newRows.push({
                            [cleanColumn]: setRows.Storage.StorageInfo[idx].PercentAvail
                        })
                    })*/
            
                /* arrayUtil.forEach(setRows.Storage.StorageInfo, function (dynamicRows, idx) {
                    });*/
                /*if (setRows.Storage.StorageInfo.length > 0) {
                    var cleanColumn = setRows.Storage.StorageInfo[idx].Description.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,'');
                }*/
                //[cleanColumn]: setRows.Storage.StorageInfo[idx].PercentAvail

            context.store.setData(results);
            context.grid.set("query", {});
        }
    });
});