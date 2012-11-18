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
    "dojo/_base/xhr",

    "hpcc/ESPResult",
    "hpcc/ESPBase"
], function (declare, lang, xhr,
        ESPResult, ESPBase) {
    return declare(ESPBase, {
        cluster: "",
        logicalName: "",
        result: [],

        constructor: function (args) {
            declare.safeMixin(this, args);
        },
        update: function (request, appData, callback) {
            /*
            lang.mixin(request, {
                Wuid: this.Wuid,
                rawxml_: true
            });
            if (this.WUInfoResponse) {
                lang.mixin(request, {
                    StateOrig: this.WUInfoResponse.State,
                    JobnameOrig: this.WUInfoResponse.Jobname,
                    DescriptionOrig: this.WUInfoResponse.Description,
                    ProtectedOrig: this.WUInfoResponse.Protected,
                    ScopeOrig: this.WUInfoResponse.Scope,
                    ClusterOrig: this.WUInfoResponse.Cluster
                });
            }
            if (appData) {
                request['ApplicationValues.ApplicationValue.itemcount'] = appData.length;
                var i = 0;
                for (key in appData) {
                    request['ApplicationValues.ApplicationValue.' + i + '.Application'] = "ESPWorkunit.js";
                    request['ApplicationValues.ApplicationValue.' + i + '.Name'] = key;
                    request['ApplicationValues.ApplicationValue.' + i + '.Value'] = appData[key];
                    ++i;
                }
            }

            var context = this;
            xhr.post({
                url: this.getBaseURL() + "/WUUpdate.json",
                handleAs: "json",
                content: request,
                load: function (response) {
                    context.WUInfoResponse = lang.mixin(context.WUInfoResponse, response.WUUpdateResponse.Workunit);
                    context.onUpdate();
                    if (callback && callback.load) {
                        callback.load(response);
                    }
                },
                error: function (error) {
                    if (callback && callback.error) {
                        callback.error(e);
                    }
                }
            });
            */
        },
        getInfo: function (args) {
            var request = {
                Name: this.logicalName,
                Cluster: this.cluster
                //UpdateDescription: false,
                //FileName: "",
                //FileDesc: "",
                //rawxml_: true
            };

            var context = this;
            xhr.post({
                url: this.getBaseURL("WsDfu") + "/DFUInfo.json",
                handleAs: "json",
                content: request,
                load: function (response) {
                    //var workunit = context.getValue(xmlDom, "Workunit", ["ECLException", "ECLResult", "ECLGraph", "ECLTimer", "ECLSchemaItem", "ApplicationValue"]);
                    if (response.DFUInfoResponse) {
                        var fileDetail = response.DFUInfoResponse.FileDetail;
                        context.DFUInfoResponse = fileDetail;
                        context.result = new ESPResult(fileDetail);

                        if (args.onGetAll) {
                            args.onGetAll(fileDetail);
                        }
                    }
                },
                error: function (e) {
                    var d = 0;
                }
            });
        },
        fetchStructure: function (format, onFetchStructure) {
            var request = {
                Name: this.logicalName,
                Format: format,
                rawxml_: true
            };

            var context = this;
            xhr.post({
                url: this.getBaseURL("WsDfu") + "/DFUDefFile",
                handleAs: "text",
                content: request,
                load: function (response) {
                    onFetchStructure(response);
                },
                error: function (e) {
                }
            });
        },
        fetchDEF: function (onFetchXML) {
            this.fetchStructure("def", onFetchXML);
        },
        fetchXML: function (onFetchXML) {
            var request = {
                Name: this.logicalName,
                Format: "xml",
                rawxml_: true
            };

            var context = this;
            xhr.post({
                url: this.getBaseURL("WsDfu") + "/DFUDefFile",
                handleAs: "text",
                content: request,
                load: function (response) {
                    onFetchXML(response);
                },
                error: function (e) {
                    var d = 0;
                }
            });
        }
    });
});
