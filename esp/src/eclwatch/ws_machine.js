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
    "dojo/topic",
    "dojo/store/JsonRest",
    "dojo/store/Memory",
    "dojo/store/Cache",
    "dojo/store/Observable",

    "hpcc/ESPRequest",
    "hpcc/ws_machine"
], function (declare, lang, arrayUtil, topic, JsonRest, Memory, Cache, Observable,
    ESPRequest, WsMachine) {

    var NagiosStore = declare([ESPRequest.Store], {
        service: "ws_machine",
        action: "GetComponentStatus",
        responseQualifier: "GetComponentStatusResponse.ComponentStatusList.ComponentStatus",
        idProperty: "__hpcc_id",

        preProcessRow: function (row) {
            lang.mixin(row, {
                __hpcc_parentName: null,
                __hpcc_id: row.ComponentType + row.EndPoint
            });
        },

        postProcessResults: function (rows) {
            var newRows = [];
            arrayUtil.forEach(rows, function (row, idx) {
                arrayUtil.forEach(row.StatusReports.StatusReport, function (statusReport, idx) {
                    newRows.push({
                        __hpcc_parentName: row.ComponentType + row.EndPoint,
                        __hpcc_id: row.ComponentType + row.EndPoint + "_" + idx,
                        Reporter:statusReport.Reporter,
                        Status:statusReport.Status,
                        StatusDetails:statusReport.StatusDetails
                    });
                });
            });
            arrayUtil.forEach(newRows, function (newRow) {
                //rows.push(newRow);
                console.log(newRows[newRow]);
            });
        }

    });

    /*var NagiosErrorStore = declare([ESPRequest.Store], {
        service: "ws_machine",
        action: "GetComponentStatus",
        responseQualifier: "GetComponentStatusResponse.StatusReport.StatusReport",
        idProperty: "Reporter"
    });*/
    /*var NagiosStore = declare([Memory], {
        idProperty: "__hpcc_id",
        mayHaveChildren: function (item) {
            return (item.getChildCount && item.getChildCount());
        },
        getChildren: function (parent, options) {
            return parent.queryChildren();
        }
    });*/

    return {
        GetComponentStatus: function (params) {
            return ESPRequest.send("ws_machine", "GetComponentStatus", params);
        },

        CreateNagiosStore: function (options) {
            var store = new NagiosStore(options);
            return Observable(store);
        },

        /*CreateNagiosErrorStore: function (options) {
            var store = new NagiosErrorStore(options);
            return Observable(store);
        },

        Get: function (id, data) {
            var store = new NagiosStore();
            var retVal = store.get(id);
            if (data) {
                retVal.updateData(data);
            }
            return retVal;
        },*/
    };
});

