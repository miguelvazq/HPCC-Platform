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
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/_base/Deferred",
    "dojo/data/ObjectStore",
    "dojo/store/util/QueryResults",
    "dojo/store/Observable",
    "dojo/Stateful",

    "hpcc/WsWorkunits",
    "hpcc/ESPRequest",
    "hpcc/ESPUtil",
    "hpcc/ESPResult"
], function (declare, arrayUtil, lang, Deferred, ObjectStore, QueryResults, Observable, Stateful,
        WsWorkunits, ESPRequest, ESPUtil, ESPResult) {

    var _logicalFiles = {};

    var Store = declare([ESPRequest.Store], {
        service: "WsWorkunits",
        action: "WUQuerysetDetails",
        responseQualifier: "WUQuerySetDetailsResponse.QuerysetQueries.QuerySetQuery",
        idProperty: "Id",

        _watched: [],
        create: function (id) {
            return new Query({
                Id: id
            });
        },
        update: function (id, item) {
            var storeItem = this.get(id);
            storeItem.updateData(item);
            if (!this._watched[id]) {
                var context = this;
                this._watched[id] = storeItem.watch("changedCount", function (name, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        context.notify(storeItem, id);
                    }
                });
            }
        },
        preProcessFullResponse: function (response, request, query, options) {
            this.activeQueries = [];
            var context = this;
            if (lang.exists("WUQuerySetDetailsResponse.QuerysetAliases", response)) {
                arrayUtil.forEach(response.WUQuerySetDetailsResponse.QuerysetAliases.QuerySetAlias, function (item, idx) {
                    context.activeQueries.push(item.Id);
                })
            }
        },
        preProcessRow: function (item, request, query, options) { 
            lang.mixin(item, {
                QuerySetName: query.QuerySetName,
                Activated: arrayUtil.indexOf(this.activeQueries, item.Id) >= 0 ? true : false
            });
        } 
    });

    var Query = declare([ESPUtil.Singleton], {
        constructor: function (args) {
            this.inherited(arguments);
            if (args) {
                declare.safeMixin(this, args);
            }
        },
        refresh: function (full) {
            return this.getDetails();
        },
        getDetails: function (args) {
            var context = this;
            return WsWorkunits.WUQueryDetails({
                request:{
                    QueryId: this.Id,
                    QuerySet: this.QuerySetName
                }
            }).then(function (response) {
                if (lang.exists("WUQueryDetailsResponse", response)) {
                    context.updateData(response.WUQueryDetailsResponse);
                }
            });
        },
        doAction: function (action) {
            var context = this;
            return WsWorkunits.WUQuerysetQueryAction(this.QuerySetName, [{
                Id: this.Id,
                Name: this.Name
            }], action).then(function (responses) {
                context.refresh();
            });
        },
        setSuspended: function (suspended) {
            return this.doAction(suspended ? "Suspend" : "Unsuspend");
        },
        setActivated: function (activated) {
            return this.doAction(activated ? "Activate" : "Deactivate");
        },
        doDelete: function () {
            return this.doAction("Delete");
        }
    });

    return {
        Get: function (Id) {
            var store = new Store();
            return store.get(Id);
        },

        CreateQueryStore: function (options) {
            var store = new Store(options);
            return new Observable(store);
        }
    };
});
