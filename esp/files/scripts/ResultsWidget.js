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
    "dojo/dom",
    "dojo/request/iframe",

    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/TabContainer",
    "dijit/registry",

    "hpcc/ESPBase",
    "hpcc/ESPWorkunit",
    "hpcc/ResultsControl",
    "dojo/text!../templates/ResultsWidget.html"
], function (declare, lang, xhr, dom, iframe,
                _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, TabContainer, registry,
                ESPBase, ESPWorkunit, ResultsControl,
                template) {
    return declare("ResultsWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "ResultsWidget",

        borderContainer: null,
        tabContainer: null,
        tabMap: [],
        selectedTab: null,

        buildRendering: function (args) {
            this.inherited(arguments);
        },

        postCreate: function (args) {
            this.inherited(arguments);
            this._initControls();
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        resize: function (args) {
            this.inherited(arguments);
            this.borderContainer.resize();
        },

        layout: function (args) {
            this.inherited(arguments);
        },

        _doDownload: function (type) {
            if (lang.exists("resultsControl.selectedResult.Sequence", this)) {
                var sequence = this.resultsControl.selectedResult.Sequence;
                var downloadPdfIframeName = "downloadIframe_" + sequence;
                var frame = iframe.create(downloadPdfIframeName);
                var url = this.wu.getBaseURL() + "/WUResultBin?Format=" + type + "&Wuid=" + this.wu.Wuid + "&Sequence=" + sequence;
                iframe.setSrc(frame, url, true);
            } else if (lang.exists("resultsControl.selectedResult.Name", this)) {
                var logicalName = this.resultsControl.selectedResult.Name;
                var downloadPdfIframeName = "downloadIframe_" + logicalName;
                var frame = iframe.create(downloadPdfIframeName);
                var url = this.wu.getBaseURL() + "/WUResultBin?Format=" + type + "&Wuid=" + this.wu.Wuid + "&LogicalName=" + logicalName;
                iframe.setSrc(frame, url, true);
            }
        },

        _onDownloadZip: function (args) {
            this._doDownload("zip");
        },

        _onDownloadGZip: function (args) {
            this._doDownload("gzip");
        },

        _onDownloadXLS: function (args) {
            this._doDownload("xls");
        },

        _onFileDetails: function (args) {
            alert("todo");
        },

        //  Implementation  ---
        onErrorClick: function (line, col) {
        },

        _initControls: function () {
            var context = this;
            this.borderContainer = registry.byId(this.id + "BorderContainer");
            this.tabContainer = registry.byId(this.id + "TabContainer");

            var context = this;
            this.tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                if (!nval.initalized) {
                    nval.init(nval.params);
                }
                context.selectedTab = nval;
            });
        },

        ensurePane: function (id, params) {
            var retVal = this.tabMap[id];
            if (!retVal) {
                if (lang.exists("Name", params) && lang.exists("Cluster", params)) {
                    retVal = new LFDetailsWidget({
                        title: params.Name,
                        params: params
                    });
                } else if (lang.exists("Wuid", params) && lang.exists("exceptions", params)) {
                    retVal = new InfoGridWidget({
                        title: "Errors/Warnings",
                        params: params
                    });
                } else if (lang.exists("result", params)) {
                    retVal = new ResultWidget({
                        title: params.result.Name,
                        params: params
                    });
                }
                this.tabMap[id] = retVal;
                this.tabContainer.addChild(retVal);
            }
        },

        init: function (params) {
            if (params.Wuid) {
                this.wu = new ESPWorkunit({
                    Wuid: params.Wuid
                });
                var monitorCount = 4;
                var context = this;
                this.wu.monitor(function () {
                    if (context.wu.isComplete() || ++monitorCount % 5 == 0) {
                        context.wu.getInfo({
                            onGetExceptions: function (exceptions) {
                                if (params.ShowErrors && exceptions.length) {
                                    context.ensurePane("exceptions", {
                                        Wuid: params.Wuid,
                                        onErrorClick: context.onErrorClick,
                                        exceptions: exceptions
                                    });
                                }
                            },
                            onGetSourceFiles: function (sourceFiles) {
                                if (params.SourceFiles) {
                                    for (var i = 0; i < sourceFiles.length; ++i) {
                                        context.ensurePane("logicalFile_" + i, {
                                            Name: sourceFiles[i].Name,
                                            Cluster: sourceFiles[i].FileCluster
                                        });
                                    }
                                }
                            },
                            onGetResults: function (results) {
                                if (!params.SourceFiles) {
                                    for (var i = 0; i < results.length; ++i) {
                                        context.ensurePane("result_" + i, {
                                            result: results[i]
                                        });
                                    }
                                }
                            }
                        });
                        if (context.selectedTab) {
                            context.selectedTab.refresh();
                        }
                    }
                });
            }
        },

        clear: function () {
            var tabs = this.tabContainer.getChildren();
            for (var i = 0; i < tabs.length; ++i) {
                this.tabContainer.removeChild(tabs[i]);
            }
            this.tabMap = [];
            this.selectedTab = null;
        },

        refresh: function (wu) {
            if (this.workunit != wu) {
                this.clear();
                this.workunit = wu;
                this.init({
                    Wuid: wu.Wuid,
                    ShowErrors: true
                });
            }
        }
    });
});
