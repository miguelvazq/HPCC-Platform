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
require([
	"dojo/_base/declare",
	"dojo/_base/xhr",
	"dojo/dom",

	"dijit/layout/_LayoutWidget",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/layout/BorderContainer",
	"dijit/layout/TabContainer",
	"dijit/layout/ContentPane",
	"dijit/registry",

	"hpcc/ECLSourceWidget",
	"hpcc/TargetSelectWidget",
	"hpcc/SampleSelectWidget",
	"hpcc/GraphWidget",
	"hpcc/ResultsWidget",
	"hpcc/ESPWorkunit",

	"dojo/text!./templates/WUDetailsWidget.html"
], function (declare, xhr, dom,
				_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, BorderContainer, TabContainer, ContentPane, registry,
				EclSourceWidget, TargetSelectWidget, SampleSelectWidget, GraphWidget, ResultsWidget, Workunit,
				template) {
	return declare("WUDetailsWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		baseClass: "WUDetailsWidget",
		wu: null,
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

		//  Implementation  ---
		_initControls: function () {
			var context = this;
			this.borderContainer = registry.byId(this.id + "BorderContainer");
		},

		init: function (params) {
			if (params.Wuid) {
				this.wu = new Workunit({
					wuid: params.Wuid
				});
				var context = this;
				this.wu.monitor(function (workunit) {
					context.monitorEclPlayground(workunit);
				});
			}
		},

		resetPage: function () {
		},

		objectToText: function(obj) {
		  	var text = ""
			for (var key in obj) {
			    text += "<b>" + key + " (" + typeof obj[key] + "):</b>  ";
				if (typeof obj[key] == "object") {
				    text += "[<br>";
					for (var i = 0; i < obj[key].length; ++i) {
						text += this.objectToText(obj[key][i]);
					}
					text += "<br>]<br>";
				} else {
					text += obj[key] + "<br>";
				}
			}
			return text;
		},

		monitorEclPlayground: function (response) {
			if (!this.loaded) {
				this.loaded = true;
				dom.byId(this.id + "WUQueryResponse").innerHTML = this.objectToText(response);
			}
			
			var context = this;
			if (this.wu.isComplete()) {
				this.wu.getInfo({
					onGetAll: function(response) {
						dom.byId(context.id + "WUInfoResponse").innerHTML = context.objectToText(response);
					}
				});
			}
		}
	});
});
