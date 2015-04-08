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
    "dojo/topic",
    "dojo/store/JsonRest",
    "dojo/store/Memory",
    "dojo/store/Cache",
    "dojo/store/Observable",

    "hpcc/ESPRequest",
    "hpcc/ws_machine"
], function (declare, lang, topic, JsonRest, Memory, Cache, Observable,
    ESPRequest, WsMachine) {

    var NagiosStore = declare([ESPRequest.Store], {
        service: "ws_machine",
        action: "GetComponentStatus",
        responseQualifier: "GetComponentStatusResponse.ComponentStatusList.ComponentStatus",
        idProperty: "ComponentTypeID",
        constructor: function (options) {
            if (options) {
                declare.safeMixin(this, options);
            }
            this.userAddedFiles = {};
        },
        addUserFile: function (_file) {
            var fileListStore = new FileListStore({
                parent: null
            });
            var file = fileListStore.get(_file.calculatedID);
            fileListStore.update(_file.calculatedID, _file);
            this.userAddedFiles[file.calculatedID] = file;
        },
        postProcessResults: function (items) {
            for (var key in this.userAddedFiles) {
                items.push(this.userAddedFiles[key]);
            }
        },
        preProcessRow: function (row) {
            lang.mixin(row, {
                OS: row.Linux === "true" ? 2 : 0
            });
            lang.mixin(row, {
                calculatedID: row.NetAddress+row.Name,
                displayName: row.Name,
                type: "dropzone",
                partialPath: "",
                fullPath: row.Path + "/",
                DropZone: row
            });
        },
        mayHaveChildren: function (item) {
            if (item.StatusReports.StatusReport) {
                return true;
            }
            return false;
        },
        getChildren: function(parent, options){
            return this.query(
                lang.mixin({}, options && options.originalQuery || null,
                    { parent: parent.id }),
            options);
        }
    });


    var NagiosErrorStore = declare([ESPRequest.Store], {
        service: "ws_machine",
        action: "GetComponentStatus",
        responseQualifier: "GetComponentStatusResponse.StatusReports.StatusReport",
        idProperty: "StatusTypeID"
    });
    var NagiosStore = declare([Memory], {
        idProperty: "__hpcc_id",
        mayHaveChildren: function (item) {
            return (item.getChildCount && item.getChildCount());
        },
        getChildren: function (parent, options) {
            return parent.queryChildren();
        }
    });
    
    return {
        GetComponentStatus: function (params) {
            return ESPRequest.send("ws_machine", "GetComponentStatus", params);
        },
        
        CreateNagiosStore: function (options) {
            var store = new NagiosStore(options);
            return Observable(store);
        },

        CreateNagiosErrorStore: function (options) {
            var store = new NagiosErrorStore(options);
            return Observable(store);
        }
    };
});

