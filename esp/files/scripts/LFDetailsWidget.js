/*##############################################################################
#	HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems.
#
#	Licensed under the Apache License, Version 2.0 (the "License");
#	you may not use this file except in compliance with the License.
#	You may obtain a copy of the License at
#
#	   http://www.apache.org/licenses/LICENSE-2.0
#
#	Unless required by applicable law or agreed to in writing, software
#	distributed under the License is distributed on an "AS IS" BASIS,
#	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#	See the License for the specific language governing permissions and
#	limitations under the License.
############################################################################## */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-class",

    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/Toolbar",
    "dijit/TooltipDialog",
    "dijit/form/SimpleTextarea",
    "dijit/form/Button",
    "dijit/TitlePane",
    "dijit/registry",

    "hpcc/ResultWidget",
    "hpcc/ECLSourceWidget",
    "hpcc/FilePartsWidget",
    "hpcc/WUDetailsWidget",
    "hpcc/DFUWUDetailsWidget",

    "hpcc/ESPLogicalFile",

    "dojo/text!../templates/LFDetailsWidget.html"
], function (declare, lang, dom, domClass, 
                _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, BorderContainer, TabContainer, ContentPane, Toolbar, TooltipDialog, SimpleTextarea, Button, TitlePane, registry,
                ResultWidget, EclSourceWidget, FilePartsWidget, WUDetailsWidget, DFUWUDetailsWidget,
                ESPLogicalFile,
                template) {
    return declare("LFDetailsWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "LFDetailsWidget",
        borderContainer: null,
        tabContainer: null,
        resultWidget: null,
        resultWidgetLoaded: false,
        sourceWidget: null,
        sourceWidgetLoaded: false,
        defWidget: null,
        defWidgetLoaded: false,
        xmlWidget: null,
        xmlWidgetLoaded: false,
        filePartsWidget: null,
        filePartsWidgetLoaded: false,
        workunitWidget: null,
        workunitWidgetLoaded: false,
        dfuWorkunitWidget: null,
        dfuWorkunitWidgetLoaded: false,
        legacyPane: null,
        legacyPaneLoaded: false,

        logicalFile: null,
        prevState: "",
        initiated: false,

        buildRendering: function (args) {
            this.inherited(arguments);
        },

        postCreate: function (args) {
            this.inherited(arguments);
            this.borderContainer = registry.byId(this.id + "BorderContainer");
            this.tabContainer = registry.byId(this.id + "TabContainer");
            this.resultWidget = registry.byId(this.id + "Content");
            this.sourceWidget = registry.byId(this.id + "Source");
            this.defWidget = registry.byId(this.id + "DEF");
            this.xmlWidget = registry.byId(this.id + "XML");
            this.filePartsWidget = registry.byId(this.id + "FileParts");
            this.workunitWidget = registry.byId(this.id + "Workunit");
            this.dfuWorkunitWidget = registry.byId(this.id + "DFUWorkunit");
            this.legacyPane = registry.byId(this.id + "Legacy");

            var context = this;
            this.tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                if (nval.id == context.id + "Content" && !context.resultWidgetLoaded) {
                    context.resultWidgetLoaded = true;
                    context.resultWidget.init({
                        result: context.logicalFile.result
                    });
                } else if (nval.id == context.id + "Source" && !context.sourceWidgetLoaded) {
                    context.sourceWidgetLoaded = true;
                    context.sourceWidget.init({
                        ECL: context.logicalFile.DFUInfoResponse.Ecl
                    });
                } else if (nval.id == context.id + "DEF" && !context.defWidgetLoaded) {
                    context.logicalFile.fetchDEF(function (response) {
                        context.defWidgetLoaded = true;
                        context.defWidget.init({
                            ECL: response
                        });
                    });
                } else if (nval.id == context.id + "XML" && !context.xmlWidgetLoaded) {
                    context.logicalFile.fetchXML(function (response) {
                        context.xmlWidgetLoaded = true;
                        context.xmlWidget.init({
                            ECL: response
                        });
                    });
                } else if (nval.id == context.id + "FileParts" && !context.filePartsWidgetLoaded) {
                    context.filePartsWidgetLoaded = true;
                    context.filePartsWidget.init({
                        fileParts: lang.exists("logicalFile.DFUInfoResponse.DFUFileParts.DFUPart", context) ? context.logicalFile.DFUInfoResponse.DFUFileParts.DFUPart : []
                    });
                } else if (nval.id == context.id + "Workunit" && !context.workunitWidgetLoaded) {
                    context.workunitWidgetLoaded = true;
                    context.workunitWidget.init({
                        Wuid: context.logicalFile.DFUInfoResponse.Wuid
                    });
                } else if (nval.id == context.id + "DFUWorkunit" && !context.workunitWidgetLoaded) {
                    context.dfuWorkunitWidgetLoaded = true;
                    context.dfuWorkunitWidget.init({
                        Wuid: context.logicalFile.DFUInfoResponse.Wuid
                    });
                } else if (nval.id == context.id + "Legacy" && !context.legacyPaneLoaded) {
                    context.legacyPaneLoaded = true;
                    context.legacyPane.set("content", dojo.create("iframe", {
                        src: "/WsDfu/DFUInfo?Name=" + context.logicalFile.logicalName + "&Cluster=" + context.logicalFile.cluster,
                        style: "border: 0; width: 100%; height: 100%"
                    }));
                }
            });
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

        //  Hitched actions  ---
        _onSave: function (event) {
            this.logicalFile.save({
                load: function (response) {
                    //TODO
                }
            });
        },
        _onDelete: function (event) {
            this.logicalFile.doDelete({
                load: function (response) {
                    //TODO
                }
            });
        },
        _onCopy: function (event) {
            this.logicalFile.copy({
                load: function (response) {
                    //TODO
                }
            });
        },
        _onDespray: function (event) {
            var context = this;
            this.logicalFile.despray({
                load: function (response) {
                }
            });
        },

        //  Implementation  ---
        init: function (params) {
            if (!this.initiated) {
                this.initiated = true;
                if (params.Name) {
                    dom.byId(this.id + "LogicalFileName").innerHTML = params.Name;
                    this.logicalFile = new ESPLogicalFile({
                        cluster: params.Cluster,
                        logicalName: params.Name
                    });
                    this.refreshPage();
                }
            }
        },

        showMessage: function (msg) {
        },

        /*isComplete: function () {
            return true;
        },*/

        refreshPage: function () {
            var context = this;
            this.logicalFile.getInfo({
                onGetAll: function (response) {
                    if (response.Wuid && response.Wuid[0] == "D" && context.workunitWidget) {
                        context.tabContainer.removeChild(context.workunitWidget);
                        context.workunitWidget.destroyRecursive();
                        context.workunitWidget = null;
                    } else if (context.dfuWorkunitWidget) {
                        context.tabContainer.removeChild(context.dfuWorkunitWidget);
                        context.dfuWorkunitWidget.destroyRecursive();
                        context.dfuWorkunitWidget = null;
                    }
                    registry.byId(context.id + "Summary").set("title", response.Filename);
                    //registry.byId(context.id + "Summary").set("iconClass", "iconRefresh");
                    //domClass.remove(context.id + "Test");
                    //domClass.add(context.id + "Test", "iconRefresh");
                    dom.byId(context.id + "Owner").innerHTML = response.Owner;
                    dom.byId(context.id + "Description").value = response.Description;
                    dom.byId(context.id + "JobName").innerHTML = response.JobName;
                    dom.byId(context.id + "Wuid").innerHTML = response.Wuid;
                    dom.byId(context.id + "Modification").innerHTML = response.Modified  + " (UTC/GMT)";
                    dom.byId(context.id + "Directory").innerHTML = response.Dir;
                    dom.byId(context.id + "RecordSize").innerHTML = response.RecordSize;
                    dom.byId(context.id + "Count").innerHTML = response.RecordCount;
                    dom.byId(context.id + "Filesize").innerHTML = response.Filesize;
                    dom.byId(context.id + "Pathmask").innerHTML = response.PathMask;
                }
            });
        }
    });
});
