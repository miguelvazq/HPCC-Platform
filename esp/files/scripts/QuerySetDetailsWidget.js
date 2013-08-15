/*##############################################################################
#   HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems.
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
############################################################################## */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/query",
    "dojo/store/Memory",
    "dojo/store/Observable",

    "dijit/registry",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",

    "hpcc/ESPWorkunit",
    "hpcc/WsWorkunits",
    "hpcc/_TabContainerWidget",

    "dojo/text!../templates/QuerySetDetailsWidget.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Textarea",
    "dijit/form/Button",
    "dijit/Toolbar",
    "dijit/TooltipDialog",
    "dijit/TitlePane"
], function (declare, dom, domAttr, domClass, query, Memory, Observable,
                registry,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
                ESPWorkunit, WsWorkunits, _TabContainerWidget,
                template) {
    return declare("QuerySetDetailsWidget", [_TabContainerWidget], {
        templateString: template,
        baseClass: "QuerySetDetailsWidget",
        
        wu: null,
        qs: null,
        initalized: false,
        summaryWidget: null,
        workunitsTab: null,
        loaded:false,

        postCreate: function (args) {
            this.inherited(arguments);
            this.borderContainer = registry.byId(this.id + "BorderContainer");
            this.summaryWidget = registry.byId(this.id + "_Summary");
            this.workunitsTab = registry.byId(this.id + "_Workunit");
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        //  Hitched actions  ---
        _onSave: function (event) {

        },
        _onDelete: function (event) {
            if (confirm('Delete selected workunits?')) {
                var context = this;
                var querySetName
                WsWorkunits.WUQuerysetQueryAction(querySetName, this.querySetGrid.getSelected(), "Delete");
                context.refreshGrid();
            }
        },

        //  Implementation  ---
        init: function (params) {
            if (this.initalized)
                return;
            this.initalized = true;
            if (params.Wuid) {

            this.workunitsTab.set("title", params.Wuid);
            this.wu = ESPWorkunit.Get(params.Wuid);
            this.qs = ESPWorkunit.Get(params.querySetName);
            var data = this.wu.getInfo(this.wu);

            for (key in params) {
                this.updateInput(key, null, params[key]);
            }

            var context = this;
            this.wu.watch(function (name, oldValue, newValue) {
                context.updateInput(name, oldValue, newValue);
            });
            this.wu.refresh();
            }
            this.selectChild(this.summaryWidget, true);
        },

        initTab: function () {
            if (!this.wu) {
                return
            }

            var currSel = this.getSelectedChild();
            if (currSel.id == this.summaryWidget.id && !this.summaryWidgetLoaded) {
                this.summaryWidgetLoaded = true;
            } else if (currSel.id == this.workunitsTab.id && !this.workunitsTabLoaded) {
                this.workunitsTabLoaded = true;
                this.workunitsTab.init({
                    Wuid: this.wu.Wuid,
                });
            }
        },

        resetPage: function () {
        },

        resize: function (args) {
            this.inherited(arguments);
        },

        updateInput: function (name, oldValue, newValue) {
           var registryNode = registry.byId(this.id + name);
            if (registryNode) {
                registryNode.set("value", newValue);
            } else {
                var domElem = dom.byId(this.id + name);
                if (domElem) {
                    switch (domElem.tagName) {
                        case "SPAN":
                        case "DIV":
                            domAttr.set(this.id + name, "innerHTML", newValue);
                            break;
                        case "INPUT":
                        case "TEXTAREA":
                            domAttr.set(this.id + name, "value", newValue);
                            break;
                        default:
                            alert(domElem.tagName);
                    }
                }
            }
            if (name === "Id") {
                this.updateInput("DetailsFor", oldValue, "Query details for: " + newValue);
            }
            /*else if(name === "Suspended"){
                registry.byId(this.id + "Suspended").get("value");
            }*/
        }
    });
});
