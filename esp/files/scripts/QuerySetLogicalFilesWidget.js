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
    "dojo/_base/array",
    "dojo/on",

    "dijit/form/Button",

    "dgrid/OnDemandGrid",
    "dgrid/Keyboard",
    "dgrid/Selection",
    "dgrid/selector",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/DijitRegistry",

    "hpcc/GridDetailsWidget",
    "hpcc/ESPWorkunit",
    "hpcc/ESPQuery",
    "hpcc/ESPUtil",

], function (declare, arrayUtil, on,
                Button,
                OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
                GridDetailsWidget, ESPWorkunit, ESPQuery, ESPUtil) {
    return declare("QuerySetLogicalFilesWidget", [GridDetailsWidget], {

        gridTitle: "Logical Files",
        idProperty: "Name",

        queryId: null,
        querySet: null,


        init: function (params) {
           if (this.inherited(arguments))
                return;
            this._refreshActionState();
           // this.refreshGrid();
            if (params) {
                this.querySet = params.QuerySet;
                this.queryId = params.QueryId;
                
                this.grid.set("query", {
                    QueryId: "icecream_query1.1",
                    QuerySet: "roxie"
                 });
            }

        },

         createGrid: function (domID) {
            var context = this;
            var retVal = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry, ESPUtil.GridHelper])({
                allowSelectAll: true,
                deselectOnRefresh: false,
                store: ESPQuery.CreateQueryLogicalFileStore(),
                columns: {
                    col1: selector({ width: 27, selectorType: 'checkbox' }),
                    /*Item: {
                        label: "File", width: 180, sortable: true,
                        formatter: function (Wuid, row) {
                            var wu = row.Server === "DFUserver" ? ESPDFUWorkunit.Get(Wuid) : ESPWorkunit.Get(Wuid);
                            return "<img src='../files/" + wu.getStateImage() + "'>&nbsp;<a href='#' class='" + context.id + "WuidClick'>" + Wuid + "</a>";
                        }

                    },*/
                    Item: { label: "Logical Files", width: 108, sortable: false },
                }
            }, domID);

            var context = this;
            on(document, "." + this.id + "WuidClick:click", function (evt) {
                if (context._onRowDblClick) {
                    var row = retVal.row(evt).data;
                    context._onRowDblClick(row);
                }
            });
            return retVal;
        },

       refreshGrid: function (args) {
        },

        refreshActionState: function (selection) {
           
        }
    });
});
