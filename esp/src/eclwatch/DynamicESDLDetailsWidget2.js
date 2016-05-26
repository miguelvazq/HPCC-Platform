/*##############################################################################
#   HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems®.
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
    "dojo/_base/lang",
    "dojo/i18n",
    "dojo/i18n!./nls/hpcc",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-form",
    "dojo/dom-attr",
    "dojo/request/iframe",
    "dojo/dom-class",
    "dojo/query",
    "dojo/store/Memory",
    "dojo/store/Observable",
    "dojo/_base/array",

    "dijit/registry",
    "dijit/form/ToggleButton",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",
    'dgrid/extensions/CompoundColumns',
    'dgrid/editor',

    "hpcc/_TabContainerWidget",
    "hpcc/ESPWorkunit",
    "hpcc/ESPRequest",
    "hpcc/ESPUtil",
    "hpcc/TargetSelectWidget",
    "hpcc/ECLSourceWidget",
    "hpcc/WsTopology",
    "hpcc/WsESDLConfig",
    "hpcc/GridDetailsWidget",

    "dojo/text!../templates/DynamicESDLDetailsWidget2.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Form",
    "dijit/form/Textarea",
    "dijit/form/Button",
    "dijit/form/DropDownButton",
    "dijit/form/ValidationTextBox",
    "dijit/Toolbar",
    "dijit/ToolbarSeparator",
    "dijit/TooltipDialog",
    "dijit/TitlePane",
    "dijit/form/TextBox",
    "dijit/Dialog",
    "dijit/form/SimpleTextarea",

    "hpcc/TableContainer"
], function (declare, lang, i18n, nlsHPCC, dom, domConstruct, domForm, domAttr, iframe, domClass, query, Memory, Observable, arrayUtil,
                registry, ToggleButton,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry, CompoundColumns, editor,
                _TabContainerWidget, ESPWorkunit, ESPRequest, ESPUtil, TargetSelectWidget, ECLSourceWidget, WsTopology, WsESDLConfig, GridDetailsWidget,
                template) {
    return declare("DynamicESDLDetailsWidget2", [GridDetailsWidget], {
        templateString: template,
        baseClass: "DynamicESDLDetailsWidget2",
        i18n: nlsHPCC,

        summaryWidget: null,
        configurationWidget: null,
        configurationWidgetLoaded: false,
        idProperty: "Name",


        postCreate: function (args) {
            this.inherited(arguments);
            this.details = registry.byId(this.id + "_Details");
            this.configurationWidget = registry.byId(this.id + "Configuration");
            this.bindingWidget = registry.byId(this.id + "_Binding");
            this.definitionID = registry.byId(this.id + "DefinitionID");
            this.bindingSaveBtn = registry.byId(this.id + "BindingSave");
            this.bindingRefresh = registry.byId(this.id + "BindingRefresh");
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        destroy: function (args) {
            this.inherited(arguments);
        },

        getTitle: function () {
            return this.i18n.title_TopologyDetails;
        },

        //  Hitched actions  ---
        _onRefresh: function (event) {
        },

        //  Implementation  ---
        init: function (params) {
            if (this.params.__hpcc_id === params.__hpcc_id)
                return;

            this.initalized = false;
            this.widget._Summary.__hpcc_initalized = false;
            this.inherited(arguments);
            var childSelected = true
            if (params.__hpcc_parentName) {
                childSelected = false
            }

            this.widget._Binding.set("disabled", childSelected);
            this.bindingSaveBtn.set("disabled", true);
            this.initTab();
            this._refreshActionState();
            this.refreshGrid();
        },

        initTab: function () {
            var context = this;
            var currSel = this.getSelectedChild();
            if (currSel.id == this.widget._Summary.id && !this.widget._Summary.__hpcc_initalized) {
                this.widget._Summary.__hpcc_initalized = true;
                var table = domConstruct.create("table", {});
                if (this.params.__hpcc_parentName) {
                    for (var key in this.params) {
                        if (this.params.hasOwnProperty(key) && !(this.params[key] instanceof Object)) {
                            if (key.indexOf("__") !== 0) {
                                switch (key) {
                                    case "Path":
                                    case "ProcessNumber":
                                    case "Widget":
                                    break;
                                default:
                                    var tr = domConstruct.create("tr", {}, table);
                                    domConstruct.create("td", {
                                        innerHTML: "<b>" + key + ":&nbsp;&nbsp;</b>"
                                    }, tr);
                                    domConstruct.create("td", {
                                        innerHTML: this.params[key]
                                    }, tr);
                                }
                            }
                        }
                    }
                    this.details.setContent(table);
                }
            }
            else if (currSel.id == this.widget._Binding.id && !this.widget._Binding.__hpcc_initalized) {
                this.widget._Binding.__hpcc_initalized = true;
                WsESDLConfig.GetESDLBinding({
                    request: {
                        EspProcName: this.params.__hpcc_parentName,
                        EspBindingName: this.params.Service,
                        IncludeInterfaceDefinition: true
                    }
                }).then(function (response) {
                    var xml = context.formatXml(response.GetESDLBindingResponse.ESDLBinding.Definition.Interface);
                    context.widget.Definition.init({
                        sourceMode: "xml"
                    });
                    context.widget.Definition.setText(xml);
                    context.refreshGrid();
                });
            }
        },

        updateInput: function (name, oldValue, newValue) {
            var registryNode = registry.byId(this.id + name);
            if (registryNode) {
                registryNode.set("value", newValue);
            }
        },

        getConfigurationStore: function (params) {
            
        },

        createGrid: function (domID) {

            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,

                columns: {
                    Name: {label: "Details", sortable: false},
                }
            }, domID);

            return retVal;
        },

        /*getColumns: function (params) {
            return [
                { field: 'Name', label: 'Methods', height: '0'},
                { label: '', children: [
                    { field: 'Attribute', label: 'Attribute', editor: 'text', editOn: 'dblclick'},
                    { field: 'Value', label: 'Value', editor: 'text', editOn: 'dblclick'}
                ]},
            ];
        },*/


        refreshGrid: function (response) {
           var context = this;
            var results = [];
            var newRow = [];
            WsESDLConfig.GetESDLBinding({
                request: {
                    EspProcName: this.params.__hpcc_parentName,
                    EspBindingName: this.params.Service,
                    IncludeInterfaceDefinition: true
                }
            }).then(function (response) {
                results = response.GetESDLBindingResponse.ESDLBinding.Configuration.Methods.Method

                arrayUtil.forEach(results, function (row, idx) {
                    newRow.push(results);
                });
                context.store.setData(newRow);
                context.grid.set("query", {Name: "*" });
            });
        }
    });
});
