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
    "dojo/_base/Deferred",
    "dojo/promise/all",
    "dojo/store/Memory",
    "dojo/store/Observable",
    "dojo/store/util/QueryResults",

    "hpcc/ws_machine",
    "hpcc/WsSMC",
    "hpcc/ESPUtil",
    "hpcc/ESPTree"
], function (declare, lang, arrayUtil, Deferred, all, Memory, Observable, QueryResults,
    WsMachine, WsSMC, ESPUtil, ESPTree) {

    var NagiosStatusItem = declare([ESPTree.Item], {
        constructor: function (args) {
            this.__hpcc_children = [];
        },
        _StatusReportsSetter: function(statusReports) {
            var context = this;
            if(lang.exists("StatusReport", statusReports)){
                arrayUtil.forEach(statusReports.StatusReport, function (row) {
                    var statusReportItem = new StatusReportItem({__hpcc_id: row.StatusTypeID});
                    statusReportItem.updateData(row);
                    this.__hpcc_children.push(statusReportItem);
                }, this);
            }
        },

        getLabel: function () {
            return this.ComponentType /*+ " " + this.ComponentTypeID*/;
        },
        getIcon: function () {
            return "workunit.png";
        }
    });

    var StatusReportItem = declare([ESPTree.Item], {
        constructor: function (args) {
            this.__hpcc_children = [];
        },

        getLabel: function () {
            return this.StatusType;
        },
        getIcon: function () {
            return "workunit.png";
        }
    });

    var NagiosStore = declare([ESPTree.Store], {
        constructor: function() {
           
        },
        createTreeNode: function (parentNode, treeItem) {
            var retVal = this.inherited(arguments);
            return retVal;
        },
        clear: function () {
            this.inherited(arguments);
        },
        query: function (query, options) {
            var data = [];
            if (this.rootItems) {
                arrayUtil.forEach(this.rootItems, function (item) {
                    data.push(this.createTreeNode(null, item));
                }, this);
            }
            return QueryResults(this.queryEngine({}, {})(data));
        },

        mayHaveChildren: function (treeNode) {
            return this.getChildren(treeNode, {}).length > 0;
        },

        getChildren: function (treeNode, options) {
            var data = [];
            data = arrayUtil.map(treeNode.__hpcc_treeItem.__hpcc_children, function (item) {
                return this.createTreeNode(treeNode, item);
            }, this);
            return QueryResults(this.queryEngine({}, {})(data));
        },

        refresh: function (callback) {
            this.clear();
            this.rootItems = [];

            var context = this;
            
            WsMachine.GetComponentStatus({
                request: {
                }
            }).then(function (response) {
                if (lang.exists("GetComponentStatusResponse.ComponentStatusList.ComponentStatus", response)) {
                    arrayUtil.forEach(response.GetComponentStatusResponse.ComponentStatusList.ComponentStatus, function (item, idx) {
                        var nagiosStatusItem = new NagiosStatusItem({
                            __hpcc_id: item.ComponentType + "::" + item.ComponentTypeID
                        });
                        nagiosStatusItem.updateData(item);
                        context.rootItems.push(nagiosStatusItem);
                    }, this);
                }
                callback();
            }); 
        }
    });

    return {
        Store: NagiosStore
    };
});
