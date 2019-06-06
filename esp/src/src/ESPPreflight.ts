//import * as WsTopology from "./WsTopology";
import * as declare from "dojo/_base/declare";
import * as lang from "dojo/_base/lang";
import * as arrayUtil from "dojo/_base/array";
import * as QueryResults from "dojo/store/util/QueryResults";
import * as Observable from "dojo/store/Observable";

import * as ESPRequest from "./ESPRequest";
//import * as ESPUtil from "./ESPUtil";

import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";
//import { arrayToMap } from './ESPResource';

var i18n = nlsHPCC;

var SystemServersStore = declare([ESPRequest.Store], {
    service: "WsTopology",
    action: "TpServiceQuery",
    responseQualifier: "TpServiceQueryResponse.ServiceList",
    idProperty: "hpcc_id",
    constructor: function (options) {
        if (options) {
            declare.safeMixin(this, options);
        }
    },
    preProcessRow: function (row) {
        lang.mixin(row, {
            Platform: this.getOS(row.OS),
            calculatedID: row.Name,
            Name: row.Name,
            type: "parentcomponent",
            Component: row.Type,
            Configuration: true
        });
    },
    preProcessResponse: function (response, request) {
        var tempArr = [];
        for (var key in response.ServiceList) {
            for (var i in response.ServiceList[key]) {
                response.ServiceList[key][i].map(function(item){
                    tempArr.push(item);
                });
            }
        }
        //tempArr.push(response.ServiceList)
        console.log(tempArr)
        return tempArr;
        
    },
    
    mayHaveChildren: function (item) {
        return item.TpMachines;
    },
    getChildren: function (parent, options) {
        var store = Observable(new ClusterProcessesList({
            parent: parent
        }));
        return store.query({
            Type: this.getMachineType(parent.Type),
            Parent: parent,
            Cluster: parent.Name,
            LogDirectory: parent.LogDirectory,
            Path: parent.Path,
            Directory: parent.Directory
        });
    },

    getMachineType: function (type) {
        switch (type) {
            case "RoxieCluster":
                return "ROXIEMACHINES"
            case "ThorCluster":
                return "THORMACHINES"
        }
    },

    getOS: function (int) {
        switch (int) {
            case 0:
                return "Windows"
            case 1:
                return "Solaris"
            case 2:
                return "Linux"
            default:
                return "Linux"
        }
    }
});

var ClusterTargetStore = declare([ESPRequest.Store], {
    service: "WsTopology",
    action: "TpTargetClusterQuery",
    responseQualifier: "TpTargetClusterQueryResponse.TpTargetClusters.TpTargetCluster",
    idProperty: "hpcc_id",
    constructor: function (options) {
        if (options) {
            declare.safeMixin(this, options);
        }
    },
    preProcessRow: function (row) {
        lang.mixin(row, {
            hpcc_id: row.Name,
            displayName: row.Name,
            type: "targetClusterProcess",
            Component: "",
            Configuration: false
        });
    },
    mayHaveChildren: function (item) {
        return item.type === "targetClusterProcess";
    },
    getChildren: function (parent, options) {
        var context = this;
        var children = [];
        var tempArr = [];
        for (var key in parent) {
            if (typeof parent[key] === "object") {
                for (var i in parent[key]) {
                    if (key !== "TpEclServers") {
                        parent[key][i].map(function(item){
                            tempArr.push(item)
                        });
                    }
                }
            }
        }

        arrayUtil.forEach(tempArr, function (item, idx) {
            children.push({
                hpcc_id: parent.Name + "_" + item.Name,
                Name: item.Type + " - " +  item.Name,
                Type: item.Type,
                Directory: item.TpMachines ? item.TpMachines.TpMachine[0].Directory : "",
                LogDirectory: item.LogDirectory,
                OS: item.TpMachines.TpMachine[0].OS,
                Platform: item.TpMachines ? context.getOS(item.TpMachines.TpMachine[0].OS) : "",
                Configuration: item.TpMachines ? true : false,
                Node: item.TpMachines ? item.TpMachines.TpMachine[0].Name : "",
                Netaddress: item.TpMachines ? item.TpMachines.TpMachine[0].Netaddress : "",
                Parent: parent,
                type: "targetClusterComponent"
            });
        });
        return QueryResults(children);
    },

    getMachineType: function (type) {
        switch (type) {
            case "RoxieCluster":
                return "ROXIEMACHINES"
            case "ThorCluster":
                return "THORMACHINES"
        }
    },

    getOS: function (int) {
        switch (int) {
            case 0:
                return "Windows"
            case 1:
                return "Solaris"
            case 2:
                return "Linux"
            default:
                return "Linux"
        }
    }
})

var ClusterProcessStore = declare([ESPRequest.Store], {
    service: "WsTopology",
    action: "TpClusterQuery",
    responseQualifier: "TpClusterQueryResponse.TpClusters.TpCluster",
    idProperty: "hpcc_id",
    constructor: function (options) {
        if (options) {
            declare.safeMixin(this, options);
        }
    },
    preProcessRow: function (row) {
        lang.mixin(row, {
            Platform: this.getOS(row.OS),
            hpcc_id: row.Name,
            displayName: row.Name,
            type: "clusterProcess",
            Component: row.Type,
            Configuration: true
        });
    },
    mayHaveChildren: function (item) {
        return item.type === "clusterProcess";
    },
    getChildren: function (parent, options) {
        var store = Observable(new ClusterProcessesList({
            parent: parent
        }));
        return store.query({
            Type: this.getMachineType(parent.Type),
            Parent: parent,
            Cluster: parent.Name,
            LogDirectory: parent.LogDirectory,
            Path: parent.Path,
            Directory: parent.Directory
        });
    },

    getMachineType: function (type) {
        switch (type) {
            case "RoxieCluster":
                return "ROXIEMACHINES"
            case "ThorCluster":
                return "THORMACHINES"
        }
    },

    getOS: function (int) {
        switch (int) {
            case 0:
                return "Windows"
            case 1:
                return "Solaris"
            case 2:
                return "Linux"
            default:
                return "Linux"
        }
    }
});

var ClusterProcessesList = declare([ESPRequest.Store], {
    service: "WsTopology",
    action: "TpMachineQuery",
    responseQualifier: "TpMachineQueryResponse.TpMachines.TpMachine",
    idProperty: "hpcc_id",

    preProcessRow: function (row) {
        lang.mixin(row, {
            Platform: this.getOS(row.OS),
            hpcc_id: row.Name + "_" + row.ProcessNumber,
            displayName: row.Name,
            type: "machine",
            Component: row.Type,
            Domain: row.Domain,
            Directory: "",
            Parent: this.parent
        });
    },

    getOS: function (int) {
        switch (int) {
            case 0:
                return "Windows"
            case 1:
                return "Solaris"
            case 2:
                return "Linux"
            default:
                return "Linux"
        }
    }
});

export function getCondition (int) {
    switch (int) {
        case 1:
            return i18n.Normal;
        case 2:
            return i18n.Warning;
        case 3:
            return i18n.Minor;
        case 4:
            return i18n.Major;
        case 5:
            return i18n.Critical;
        case 6:
            return i18n.Fatal;
        default:
            return i18n.Unknown;
    }
}

export function getState (int) {
    switch (int) {
        case 0:
            return i18n.Unknown;
        case 1:
            return i18n.Starting;
        case 2:
            return i18n.Stopping;
        case 3:
            return i18n.Suspended;
        case 4:
            return i18n.Recycling;
        case 5:
            return i18n.Ready;
        case 6:
            return i18n.Busy;
        default:
            return i18n.Unknown;
    }
}

export function CreateTargetClusterStore(options) {
    var store = new ClusterTargetStore(options);
    return Observable(store);
}

export function CreateClusterProcessStore(options) {
    var store = new ClusterProcessStore(options);
    return Observable(store);
}

export function CreateSystemServersStore(options) {
    var store = new SystemServersStore(options);
    return Observable(store);
}

export function MachineQuery(params) {
    return ESPRequest.send("WsTopology", "TpMachineQuery", params);
}

export function GetConfiguration(params) {
    return ESPRequest.send("WsTopology", "TpGetComponentFile", params);
}