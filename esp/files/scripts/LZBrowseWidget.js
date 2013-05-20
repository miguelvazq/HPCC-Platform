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
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-form",
    "dojo/date",
    "dojo/on",

    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/registry",
    "dijit/Dialog",
    "dijit/Menu",
    "dijit/MenuItem",
    "dijit/MenuSeparator",
    "dijit/PopupMenuItem",

    "dgrid/OnDemandGrid",
    "dgrid/tree",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",
    "dgrid/extensions/Pagination",

    "hpcc/_TabContainerWidget",
    "hpcc/FileSpray",
    "hpcc/ESPUtil",
    "hpcc/HexViewWidget",
    "hpcc/TargetSelectWidget",

    "dojo/text!../templates/LZBrowseWidget.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Form",
    "dijit/form/Textarea",
    "dijit/form/DateTextBox",
    "dijit/form/TimeTextBox",
    "dijit/form/Button",
    "dijit/form/RadioButton",
    "dijit/form/Select",
    "dijit/Toolbar",
    "dijit/ToolbarSeparator",
    "dijit/TooltipDialog",
    "dijit/form/DropDownButton",

    "dojox/layout/TableContainer",
    "dojox/form/Uploader"

], function (declare, lang, arrayUtil, dom, domAttr, domClass, domForm, date, on,
                _TemplatedMixin, _WidgetsInTemplateMixin, registry, Dialog, Menu, MenuItem, MenuSeparator, PopupMenuItem,
                OnDemandGrid, tree, Keyboard, Selection, selector, ColumnResizer, DijitRegistry, Pagination,
                _TabContainerWidget, FileSpray, ESPUtil, HexViewWidget, TargetSelectWidget,
                template) {
    return declare("LZBrowseWidget", [_TabContainerWidget, _TemplatedMixin, _WidgetsInTemplateMixin, ESPUtil.FormHelper], {
        templateString: template,
        baseClass: "LZBrowseWidget",

        landingZonesTab: null,
        landingZonesGrid: null,
        

        tabMap: [],

        validateDialog: null,

        postCreate: function (args) {
            this.inherited(arguments);
            this.landingZonesTab = registry.byId(this.id + "_LandingZones");
            this.sprayFixedDestinationSelect = registry.byId(this.id + "SprayFixedDestination");
            this.sprayVariableDestinationSelect = registry.byId(this.id + "SprayVariableDestination");
            this.sprayXmlDestinationSelect = registry.byId(this.id + "SprayXmlDestinationSelect");
            this.dropZoneSelect = registry.byId(this.id + "DropZoneTargetSelect");
        },

        startup: function (args) {
            this.inherited(arguments);
            registry.byId(this.id + "Submit").set("disabled", true);
        },

        _handleResponse: function (wuidQualifier, response) {
            if (lang.exists(wuidQualifier, response)) {
                var wu = ESPDFUWorkunit.Get(lang.getObject(wuidQualifier, false, response));
                wu.startMonitor(true);
                var tab = this.ensurePane(this.id + "_" + wu.ID, {
                    Wuid: wu.ID
                });
                if (tab) {
                    this.selectChild(tab);
                }
            }
        },

        //  Hitched actions  ---
        _onRefresh: function (event) {
            this.refreshGrid();
        },

        _onDelete: function (event) {
            if (confirm('Delete selected files?')) {
                var context = this;
                arrayUtil.forEach(this.landingZonesGrid.getSelected(), function(item, idx) {
                    FileSpray.DeleteDropZoneFile({
                        request:{
                            NetAddress:	item.DropZone.NetAddress,
                            Path: item.DropZone.Path,
                            OS: item.DropZone.Linux ? 1 : 0,
                            Names: item.partialPath
                        },
                        load: function (response) {
                            context.refreshGrid();
                        }
                    });
                });
            }
        },

        _onHexPreview: function (event) {
            var selections = this.landingZonesGrid.getSelected();
            var firstTab = null;
            var context = this;
            arrayUtil.forEach(selections, function (item, idx) {
                var tab = context.ensurePane(context.id + "_" + item.calculatedID, item.displayName, {
                    logicalFile: item.getLogicalFile()
                });
                if (firstTab === null) {
                    firstTab = tab;
                }
            });
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onUpload: function (event) {
            registry.byId(this.id + "Submit").set("disabled", false);
        },
        
        _onSubmit: function (event) {
            context.refreshGrid();
        },


        _onSprayFixed: function(event) {
            var context = this;
            var selections = this.landingZonesGrid.getSelected();
            arrayUtil.forEach(selections, function (item, idx) {
                var formData = domForm.toObject(context.id + "SprayFixedDialog");
                lang.mixin(formData, {
                    sourceIP: item.DropZone.NetAddress,
                    sourcePath: item.fullPath
                });

                FileSpray.SprayFixed({
                    request: formData
                }).then(function (response) {
                    var tab = context.ensurePane(context.id + "_" + item.name, {
                        logicalFile: item.getLogicalFile()
                    });
                })
            });
             registry.byId(this.id + "SprayFixedDropDown").closeDropDown();
        },

        _onSprayFixedCancel: function (event) {
            registry.byId(this.id + "SprayFixedDropDown").closeDropDown();
        },

        _onSprayVariable: function(event) {
            var context = this;
            var selections = this.landingZonesGrid.getSelected();
            arrayUtil.forEach(selections, function (item, idx) {
                var formData = domForm.toObject(context.id + "SprayVariableDialog");
                lang.mixin(formData, {
                    sourceIP: item.DropZone.NetAddress,
                    sourcePath: item.DropZone.fullPath
                });
                FileSpray.SprayVariable({
                    request: formData
                }).then(function (response) {
                });
            });
             registry.byId(this.id + "SprayVariableDropDown").closeDropDown();
        },

        _onSprayVariableCancel: function (event) {
            registry.byId(this.id + "SprayVariableDropDown").closeDropDown();
        },

        _onSprayXml: function(event) {
            var context = this;
            var selections = this.landingZonesGrid.getSelected();
            arrayUtil.forEach(selections, function (item, idx) {
                var formData = domForm.toObject(context.id + "SprayXmlDialog");
                lang.mixin(formData, {
                    sourceIP: item.DropZone.NetAddress,
                    sourcePath: item.DropZone.Path

                });
                FileSpray.SprayVariable({
                    request: formData
                }).then(function (response) {
                });
            });
             registry.byId(this.id + "SprayXmlDropDown").closeDropDown();
        },

        _onSprayXmlCancel: function (event) {
            registry.byId(this.id + "SprayXmlDropDown").closeDropDown();
        },

        _onRowDblClick: function (wuid) {
            var wuTab = this.ensurePane(this.id + "_" + wuid, {
                Wuid: wuid
            });
            this.selectChild(wuTab);
        },

        _onRowContextMenu: function (item, colField, mystring) {
        },

        //  Implementation  ---
        init: function (params) {
            if (this.initalized)
                return;
            this.initalized = true;
            var context = this;
            this.initLandingZonesGrid();
            this.selectChild(this.landingZonesTab, true);

            this.sprayFixedDestinationSelect.init({
                Groups: true
            });
            this.sprayVariableDestinationSelect.init({
                Groups: true
            });
            this.sprayXmlDestinationSelect.init({
                Groups: true
            });
            this.dropZoneSelect.init({
                DropZones: true,
                callback: function (value, item) {
                    context.updateInput("FileUploadForm", null, "/FileSpray/UploadFile?upload_&NetAddress=" + item.machine.Netaddress + "&OS=" + item.machine.OS + "&Path=" + item.machine.Directory + "");
                }
            });
            
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id == this.landingZonesTab.id) {
                } else {
                    if (!currSel.initalized) {
                        currSel.init(currSel.params);
                    }
                }
            }
        },

        updateInput: function (name, oldValue, newValue) {
            var registryNode = registry.byId(this.id + name);
            if (registryNode) {
                registryNode.set("action", newValue);
            }else {
                var domElem = dom.byId(this.id + name);
                if (domElem) {
                    switch (domElem.tagName) {
                        case "FORM":
                            domAttr.set(this.id + name, "action", newValue);
                            break;
                        default:
                            alert(domElem.tagName);
                    }
                }
            }
        },

        addMenuItem: function (menu, details) {
            var menuItem = new MenuItem(details);
            menu.addChild(menuItem);
            return menuItem;
        },

        initLandingZonesGrid: function () {
            var store = new FileSpray.CreateLandingZonesStore();
            this.landingZonesGrid = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
                allowSelectAll: true,
                deselectOnRefresh: false,
                store: store,
                columns: {
                    col1: selector({
                        width: 27,
                        selectorType: 'checkbox',
                        disabled: function (item) {
                            if (item.type) {
                                switch (item.type) {
                                    case "dropzone":
                                    case "folder":
                                        return true;
                                }
                            }
                            return false;
                        }
                    }),
                    displayName: tree({
                        label: "Name",
                        collapseOnRefresh: true,
                        formatter: function (name, row) {
                            var img = "../files/img/";
                            if (row.isDir === undefined) {
                                img += "server.png";
                            } else if (row.isDir) {
                                img += "folder.png";
                            } else {
                                img += "file.png";
                            }
                            return "<img src='" + img + "'/>&nbsp" + name;
                        }
                    }),
                    filesize: { label: "Size", width: 108 },
                    modifiedtime: { label: "Date", width: 180 }
                },
                getSelected: function () {
                    var retVal = [];
                    var store = FileSpray.CreateFileListStore();
                    for (key in this.selection) {
                        retVal.push(store.get(key));
                    }
                    return retVal;
                }
            }, this.id + "LandingZonesGrid");
            this.landingZonesGrid.set("noDataMessage", "<span>Zero Files (Upload Some Files).</span>");

            var context = this;
            on(document, ".WuidClick:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.landingZonesGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.landingZonesGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onRowDblClick) {
                    var item = context.landingZonesGrid.row(evt).data;
                    context._onRowDblClick(item.Wuid);
                }
            });
            this.landingZonesGrid.on(".dgrid-row:contextmenu", function (evt) {
                if (context._onRowContextMenu) {
                    var item = context.landingZonesGrid.row(evt).data;
                    var cell = context.landingZonesGrid.cell(evt);
                    var colField = cell.column.field;
                    var mystring = "item." + colField;
                    context._onRowContextMenu(item, colField, mystring);
                }
            });
            this.landingZonesGrid.onSelectionChanged(function (event) {
                context.refreshActionState();
            });
            this.landingZonesGrid.onContentChanged(function (object, removedFrom, insertedInto) {
                context.refreshActionState();
            });
            this.landingZonesGrid.startup();
            this.refreshActionState();
        },

        refreshGrid: function (args) {
            this.landingZonesGrid.set("query", {
                id: "*"
            });
        },

        refreshActionState: function () {
            var selection = this.landingZonesGrid.getSelected();
            var hasSelection = selection.length;
            registry.byId(this.id + "HexPreview").set("disabled", !hasSelection);
            /*
            var hasSelection = false;
            var hasProtected = false;
            var hasNotProtected = false;
            var hasFailed = false;
            var hasNotFailed = false;
            var hasCompleted = false;
            var hasNotCompleted = false;
            for (var i = 0; i < selection.length; ++i) {
                hasSelection = true;
                if (selection[i] && selection[i].Protected !== null) {
                    if (selection[i].Protected != "0") {
                        hasProtected = true;
                    } else {
                        hasNotProtected = true;
                    }
                }
                if (selection[i] && selection[i].StateID !== null) {
                    if (selection[i].StateID == "4") {
                        hasFailed = true;
                    } else {
                        hasNotFailed = true;
                    }
                    if (WsWorkunits.isComplete(selection[i].StateID)) {
                        hasCompleted = true;
                    } else {
                        hasNotCompleted = true;
                    }
                }
            }

            registry.byId(this.id + "Open").set("disabled", !hasSelection);
            registry.byId(this.id + "Delete").set("disabled", !hasNotProtected);
            registry.byId(this.id + "Abort").set("disabled", !hasNotCompleted);
            registry.byId(this.id + "SetToFailed").set("disabled", !hasNotProtected);
            registry.byId(this.id + "Protect").set("disabled", !hasNotProtected);
            registry.byId(this.id + "Unprotect").set("disabled", !hasProtected);
            registry.byId(this.id + "Reschedule").set("disabled", true);    //TODO
            registry.byId(this.id + "Deschedule").set("disabled", true);    //TODO

            this.menuProtect.set("disabled", !hasNotProtected);
            this.menuUnprotect.set("disabled", !hasProtected);

            this.refreshFilterState();
            */
        },

        ensurePane: function (id, title, params) {
            var retVal = registry.byId(id);
            if (!retVal) {
                var context = this;
                retVal = new HexViewWidget({
                    id: id,
                    title: title,
                    closable: true,
                    params: params
                });
                this.addChild(retVal);
            }
            return retVal;
        }

    });
});
