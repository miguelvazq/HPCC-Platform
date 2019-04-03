//import * as WsTopology from "./WsTopology";
import * as declare from "dojo/_base/declare";
import * as lang from "dojo/_base/lang";
//import * as arrayUtil from "dojo/_base/array";
//import * as QueryResults from "dojo/store/util/QueryResults";
import * as Observable from "dojo/store/Observable";

import * as ESPRequest from "./ESPRequest";
//import * as ESPUtil from "./ESPUtil";

import "dojo/i18n";
// @ts-ignore
import * as nlsHPCC from "dojo/i18n!hpcc/nls/hpcc";

var i18n = nlsHPCC;

var ClusterProcessesList = declare([ESPRequest.Store], {
    service: "WsTopology",
    action: "TpMachineQuery",
    responseQualifier: "TpMachineQueryResponse.TpMachines.TpMachine",
    idProperty: "calculatedID",

    preProcessRow: function (row) {
        lang.mixin(row, {
            Platform: this.getOS(row.OS)
        });
        lang.mixin(row, {
            calculatedID: row.Name + "_" + row.Path,
            displayName: row.Name,
            type: "machine",
            Component: row.Type,
            Domain: row.Domain,
            Directory: ""
        });
    },
    postProcessResults: function (items) {
        // items.sort(function (l, r) {
        //     if (l.isDir === r.isDir) {
        //         if (l.displayName === r.displayName)
        //             return 0;
        //         else if (l.displayName < r.displayName)
        //             return -1;
        //         return 1;
        //     } else if (l.isDir) {
        //         return -1;
        //     }
        //     return 1;
        // });
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

var ClusterProcessStore = declare([ESPRequest.Store], {
    service: "WsTopology",
    action: "TpClusterQuery",
    responseQualifier: "TpClusterQueryResponse.TpClusters.TpCluster",
    idProperty: "calculatedID",
    constructor: function (options) {
        if (options) {
            declare.safeMixin(this, options);
        }
    },
    // postProcessResults: function (items) {
    //     for (var key in this.userAddedFiles) {
    //         items.push(this.userAddedFiles[key]);
    //     }
    // },
    // preRequest: function (request) {
    //     request.ECLWatchVisibleOnly = true
    // },
    preProcessRow: function (row) {
        lang.mixin(row, {
            Platform: this.getOS(row.OS)
        });
        lang.mixin(row, {
            calculatedID: row.Path + "_" + row.Name,
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

export function CreateClusterProcessStore(options) {
    var store = new ClusterProcessStore(options);
    return Observable(store);
}

export function MachineQuery(params) {
    return ESPRequest.send("WsTopology", "TpMachineQuery", params);
}