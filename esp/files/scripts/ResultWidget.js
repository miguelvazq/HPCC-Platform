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
    "dojo/text!../templates/ResultWidget.html"
], function (declare, lang, xhr, dom, iframe,
                _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, TabContainer, registry,
                ESPBase, ESPWorkunit, ResultsControl,
                template) {
    return declare("ResultWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "ResultWidget",

        borderContainer: null,
        grid: null,

        initalized: false,
        loaded: false,

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
            //TODO Fix
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
            this.grid = registry.byId(this.id + "Grid");
        },

        init: function (params) {
            if (this.initalized) {
                return;
            }
            this.initalized = true;
            this.result = params.result;
            //TODO:  Encapsulate this IF into ESPResult.js
            if (params.result && params.result.canShowResults()) {
                this.grid.setStructure(params.result.getStructure());
                this.grid.setStore(params.result.getObjectStore());
                this.refresh();
            } else {
                this.grid.setStructure([
                            {
                                name: "##", width: "6"
                            }
                ]);
                this.grid.showMessage("[undefined]");
            }
        },

        refresh: function () {
            if (this.result && !this.result.isComplete()) {
                this.grid.showMessage(this.result.getLoadingMessage());
            } else if (!this.loaded) {
                this.loaded = true;
                this.grid.setQuery({
                    id: "*"
                });
            }
        }
    });
});
