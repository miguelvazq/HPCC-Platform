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
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/query",
    "dojo/store/Memory",
    "dojo/store/Observable",

    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/registry",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",

    "hpcc/_TabContainerWidget",
    "hpcc/ESPWorkunit",
    "hpcc/ECLSourceWidget",
    "hpcc/TargetSelectWidget",
    "hpcc/SampleSelectWidget",
    "hpcc/GraphsWidget",
    "hpcc/ResultsWidget",
    "hpcc/SourceFilesWidget",
    "hpcc/InfoGridWidget",
    "hpcc/LogsWidget",
    "hpcc/TimingPageWidget",
    "hpcc/ECLPlaygroundWidget",
    "hpcc/UsersWidget",

    "dojo/text!../templates/OpsWidget.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Textarea",
    "dijit/form/Button",
    "dijit/Toolbar",
    "dijit/TooltipDialog",
    "dijit/TitlePane"
], function (declare, dom, domAttr, domClass, query, Memory, Observable,
                _TemplatedMixin, _WidgetsInTemplateMixin, registry,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
                _TabContainerWidget, ESPWorkunit, EclSourceWidget, TargetSelectWidget, SampleSelectWidget, GraphsWidget, ResultsWidget, SourceFilesWidget, InfoGridWidget, LogsWidget, TimingPageWidget, ECLPlaygroundWidget, UsersWidget,
                template) {
    return declare("OpsWidget", [_TabContainerWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "OpsWidget",
        usersWidget: null,

        postCreate: function (args) {
            this.inherited(arguments);
            this.usersWidget = registry.byId(this.id + "_Users");
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        //  Hitched actions  ---

        //  Implementation  ---
        init: function (params) {
            if (this.initalized)
                return;
            this.initalized = true;
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel.id == this.usersWidget.id && !this.usersWidgetLoaded) {
                this.usersWidgetLoaded = true;
                this.usersWidget.init({
                });
            }
        }
    });
});
