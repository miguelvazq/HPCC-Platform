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
    "dojo/_base/xhr",
    "dojo/dom",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",

    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/Toolbar",
    "dijit/TooltipDialog",
    "dijit/form/Textarea",
    "dijit/form/Button",
    "dijit/TitlePane",
    "dijit/registry",

    "hpcc/ECLSourceWidget",
    "hpcc/TargetSelectWidget",
    "hpcc/SampleSelectWidget",
    "hpcc/GraphWidget",
    "hpcc/ResultWidget",
    "hpcc/InfoGridWidget",
    "hpcc/LogsWidget",
    "hpcc/ESPWorkunit",
    "hpcc/ESPLogicalFile",

    "dojo/text!../templates/LFDetailsWidget.html"
], function (declare, xhr, dom, Memory, ObjectStore,
                _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, BorderContainer, TabContainer, ContentPane, Toolbar, TooltipDialog, Textarea, Button, TitlePane, registry,
                EclSourceWidget, TargetSelectWidget, SampleSelectWidget, GraphWidget, ResultWidget, InfoGridWidget, LogsWidget, Workunit, ESPLogicalFile,
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
        workunitWidget: null,
        workunitWidgetLoaded: false,


        timersWidget: null,
        timersWidgetLoaded: false,
        graphsWidget: null,
        graphsWidgetLoaded: false,
        logsWidget: null,
        logsWidgetLoaded: false,
        playgroundWidget: null,
        playgroundWidgetLoaded: false,

        wu: null,
        prevState: "",

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
            this.workunitWidget = registry.byId(this.id + "Workunit");

            var context = this;
            this.tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                if (nval.id == context.id + "Content" && !context.resultWidgetLoaded) {
                    context.resultWidgetLoaded = true;
                    context.resultWidget.init({
                        result: context.wu.result
                    });
                } else if (nval.id == context.id + "Source" && !context.sourceWidgetLoaded) {
                    context.sourceWidgetLoaded = true;
                    context.sourceWidget.init({
                        ECL: context.wu.DFUInfoResponse.Ecl
                    });
                } else if (nval.id == context.id + "DEF" && !context.defWidgetLoaded) {
                    context.wu.fetchDEF(function (response) {
                        context.defWidgetLoaded = true;
                        context.defWidget.init({
                            ECL: response
                        });
                    });
                } else if (nval.id == context.id + "XML" && !context.xmlWidgetLoaded) {
                    context.wu.fetchXML(function (response) {
                        context.xmlWidgetLoaded = true;
                        context.xmlWidget.init({
                            ECL: response
                        });
                    });
                } else if (nval.id == context.id + "Workunit" && !context.workunitWidgetLoaded) {
                    context.workunitWidgetLoaded = true;
                    context.workunitWidget.init({
                        Wuid: context.wu.DFUInfoResponse.Wuid
                    });
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
            this.wu.save({
                load: function (response) {
                    //TODO
                }
            });
        },
        _onDelete: function (event) {
            this.wu.doDelete({
                load: function (response) {
                    //TODO
                }
            });
        },
        _onCopy: function (event) {
            this.wu.copy({
                load: function (response) {
                    //TODO
                }
            });
        },
        _onDespray: function (event) {
            var context = this;
            this.wu.despray({
                load: function (response) {
                }
            });
        },

        //  Implementation  ---
        init: function (params) {
            if (params.Name) {
                dom.byId(this.id + "LogicalFileName").innerHTML = params.Name;
                this.wu = new ESPLogicalFile({
                    cluster: params.Cluster,
                    logicalName: params.Name
                });
                this.refreshPage();
            }
        },

        showMessage: function (msg) {
        },

        /*isComplete: function () {
            return true;
        },*/

        refreshPage: function () {
            var context = this;
            this.wu.getInfo({
                onGetAll: function (response) {
                    registry.byId(context.id + "Summary").set("title", response.Filename);
                    dom.byId(context.id + "Owner").innerHTML = response.Owner;
                }
            });
        }
    });
});
