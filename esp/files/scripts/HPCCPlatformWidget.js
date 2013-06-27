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
    "dojo/dom-construct",

    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/registry",
    "dijit/Tooltip",

    "hpcc/_TabContainerWidget",
    "hpcc/ESPRequest",
    "hpcc/WsAccount",

    "dojo/text!../templates/HPCCPlatformWidget.html",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/StackContainer",
    "dijit/layout/StackController",
    "dijit/layout/ContentPane",
    "dijit/Toolbar",
    "dijit/TooltipDialog",

    "hpcc/DFUQueryWidget",
    "hpcc/LZBrowseWidget",
    "hpcc/GetDFUWorkunitsWidget",
    "hpcc/WUQueryWidget",
    "hpcc/OpsWidget"

], function (declare, dom, domConstruct,
                _TemplatedMixin, _WidgetsInTemplateMixin, registry, Tooltip,
                _TabContainerWidget, ESPRequest, WsAccount,
                template) {
    return declare("HPCCPlatformWidget", [_TabContainerWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        baseClass: "HPCCPlatformWidget",

        postCreate: function (args) {
            this.inherited(arguments);
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        //  Hitched actions  ---
        _onOpenLegacy: function (evt) {
            var win = window.open("\\", "_blank");
            win.focus();
        },

        _onAbout: function (evt) {
        },

        //  Implementation  ---
        init: function (params) {
            if (this.initalized)
                return;
            this.initalized = true;

            var context = this;
            WsAccount.MyAccount({
            }).then(function (response) {
                if(response.MyAccountResponse.user = null){
                    //domConstruct.destroy("userAccount");
                    console.log("no user");
                }
                dom.byId(context.id + "UserID").innerHTML = response.MyAccountResponse.username;
                
            },
            function (error) {
            });
            this.initTab();

            new Tooltip({
                connectId: ["stubStackController_stub_ECL"],
                label: "Workunits",
                position: ["below"]
             });

            new Tooltip({
                connectId: ["stubStackController_stub_DFU"],
                label: "DFU Workunits",
                position: ["below"]
            });

            new Tooltip({
                connectId: ["stubStackController_stub_LF"],
                label: "Logical Files",
                position: ["below"]
            });
            new Tooltip({
                connectId: ["stubStackController_stub_Queries"],
                label: "Targets",
                position: ["below"]
            });
            new Tooltip({
                connectId: ["stubStackController_stub_LZ"],
                label: "Landing Zones",
                position: ["below"]
            });

            new Tooltip({
                connectId: ["stubStackController_stub_OPS"],
                label: "Operations",
                position: ["below"]
            });
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id === this.id + "_Queries") {
                    currSel.set("content", dojo.create("iframe", {
                        src: ESPRequest.getBaseURL() + "/WUQuerySets",
                        style: "border: 0; width: 100%; height: 100%"
                    }));
                    currSel.initalized = true;
                } else if (currSel.init) {
                    currSel.init(currSel.params);
                }
            }
        }
    });
});
