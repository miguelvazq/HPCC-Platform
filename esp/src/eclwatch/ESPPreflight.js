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
    "dojo/_base/array",
    "dojo/_base/Deferred",
    "dojo/promise/all",
    "dojo/store/Memory",
    "dojo/store/Observable",
    "dojo/store/util/QueryResults",

    "hpcc/WsTopology",
    "hpcc/WsSMC",
    "hpcc/ESPUtil",
    "hpcc/ESPRequest",
], function (declare, lang, arrayUtil, Deferred, all, Memory, Observable, QueryResults,
    WsTopology, WsSMC, ESPUtil, ESPRequest) {

    var PreflightStore = declare([ESPRequest.Store], {

        query: function (query, options) {
            var data = [];
            var instance = {};
            var machines = {};
            var context = this;

            function getMachines(treeItem, parentTreeItem) {
                if (treeItem instanceof TpMachine) {
                    if (!machines[treeItem.Netaddress]) {
                        var machineNode = context.createTreeNode(null, treeItem);
                        machines[treeItem.Netaddress] = machineNode;
                        data.push(machineNode);
                    }
                    if (parentTreeItem) {
                        if (!instance[treeItem.getUniqueID()]) {
                            instance[treeItem.getUniqueID()] = true;
                            context.createTreeNode(machines[treeItem.Netaddress], parentTreeItem);
                        }
                    }
                }
                arrayUtil.forEach(treeItem.__hpcc_children, function (child) {
                    getMachines(child, treeItem);
                }, this);
            }

            if (this.rootItem) {
                switch (this._viewMode) {
                    case "Debug":
                        data.push(this.createTreeNode(null, this.rootItem));
                        break;
                    case "Targets":
                        arrayUtil.forEach(this.rootItem.__hpcc_children, function (item) {
                            if (item.__hpcc_type === "TargetClusterType") {
                                data.push(this.createTreeNode(null, item));
                            }
                        }, this);
                        break;
                    case "Services":
                        arrayUtil.forEach(this.rootItem.__hpcc_children, function (item) {
                            if (item.__hpcc_type === "Services") {
                                arrayUtil.forEach(item.__hpcc_children, function (item2) {
                                    if (item2.__hpcc_type === "ServiceType") {
                                        data.push(this.createTreeNode(null, item2));
                                    }
                                }, this);
                            }
                        }, this);
                        break;
                    case "Machines":
                        instance = {};
                        machines = {};
                        getMachines(this.rootItem);
                        data.sort(function (a, b) {
                            aa = a.__hpcc_treeItem.Netaddress.split(".");
                            bb = b.__hpcc_treeItem.Netaddress.split(".");
                            var resulta = aa[0] * 0x1000000 + aa[1] * 0x10000 + aa[2] * 0x100 + aa[3] * 1;
                            var resultb = bb[0] * 0x1000000 + bb[1] * 0x10000 + bb[2] * 0x100 + bb[3] * 1;
                            return resulta - resultb;
                        });
                        break;
                }
            }
            return QueryResults(this.queryEngine({}, {})(data));
        },

        refresh: function (callback) {
            this.clear();
            this.rootItem = createTreeItem(TopologyRoot, "root");

            var calls = [];
            var context = this;
            return all({
                targetClusterQuery: WsTopology.TpTargetClusterQuery({
                    request: {
                        Type: "ROOT"
                    }
                }).then(function (response) {
                    var clusterTypes = {};
                    var retVal = [];
                    if (lang.exists("TpTargetClusterQueryResponse.TpTargetClusters", response)) {
                        arrayUtil.forEach(response.TpTargetClusterQueryResponse.TpTargetClusters.TpTargetCluster, function (item, idx) {
                            if (!clusterTypes[item.Type]) {
                                clusterTypes[item.Type] = createTreeItem(TargetClusterType, item.Type, context.rootItem, { Name: item.Type })
                                retVal.push(clusterTypes[item.Type]);
                            }
                            clusterTypes[item.Type].appendChild(createTreeItem(TargetCluster, item.Name, context.rootItem, item));
                        }, this);
                    }
                    return retVal;
                }),
                serviceQuery: WsTopology.TpServiceQuery({
                    request: {
                        Type: "ALLSERVICES"
                    }
                }).then(function (response) {
                    var retVal = [];
                    if (lang.exists("TpServiceQueryResponse.ServiceList", response)) {
                        retVal.push(createTreeItem(Services, "Services", context.rootItem, response.TpServiceQueryResponse.ServiceList));
                    }
                    return retVal;
                })
            }).then(function (responses) {
                context.rootItem.appendChildren(responses.targetClusterQuery);
                context.rootItem.appendChildren(responses.serviceQuery);
                callback();
            });
        }
    });

    var PreflightTargetClusterStore = declare([ESPRequest.Store], {
        service: "WsTopology",
        action: "TpTargetClusterQuery",
        responseQualifier: "TpTargetClusterQueryResponse.TpTargetClusters.TpTargetCluster",
        idProperty: "Name",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
    });

    return {
        CreatePreflightTargetClusterStore: function (options) {
            var store = new PreflightTargetClusterStore(options);
            return Observable(store);
        }
    };
});
