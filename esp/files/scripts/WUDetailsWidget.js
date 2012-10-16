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
			this.wuid = params["Wuid"];
			dom.byId("showWuid").innerHTML = this.wuid;
			if (this.wuid) {
				this.wu = new Workunit({
					wuid: this.wuid,
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
			    text += "<tr><td>" + key + ":</td>";
				if (typeof obj[key] == "object") {
				    text += "[<br>";
					for (var i = 0; i < obj[key].length; ++i) {
						text += this.objectToText(obj[key][i]);
					}
					text += "<br>]<br>";
				} else {
					text += "<td>" +  obj[key] + "</td></tr>";
				
				}
			}
			return text;

		},		
		

		monitorEclPlayground: function (response) {
			if (!this.loaded) {				
				//dom.byId(this.id + "WUInfoResponse").innerHTML = this.objectToText(response);				
				dom.byId("showAction").innerHTML = response.ActionId;					
				//dom.byId("showState").innerHTML = response.State;
				dom.byId("showOwner").innerHTML = response.Owner;
				dom.byId("showScope").value = response.Scope;
				dom.byId("showJobName").value = response.Jobname;
				dom.byId("showCluster").innerHTML = response.Cluster;

				
				this.loaded = true;
			}
			
			var context = this;
			if (this.wu.isComplete()) {
				var tc = new TabContainer({
           		style: "width: 100%;height:100%;",
           		useMenu:false,
           		useSlider:false,
           	}, "tc1-prog");

				tc.startup();
				this.wu.getInfo({
					onGetResults: function(response) {
						var cp1 = new ContentPane({
	             		title: "Results " + "(" + response.length +")",
	             		content: "response.results"
	        			});
        				tc.addChild(cp1);				
					},

					onGetGraphs: function(response){
						var cp2 = new ContentPane({
	             		title: "Graphs " + "(" + response.length +")",
	             		content: "Graphs content in here"
	        			});
        				tc.addChild(cp2);
					},	

					onGetTimers: function(response){
						var cp3 = new ContentPane({
	             		title: "Timers " + "(" + response.length +")",
	             		content: "Timers content in here"
	        			});
        				tc.addChild(cp3);
						
					},
					onGetSourceFiles: function(response){
						var cp4 = new ContentPane({
	             		title: "Source " + "(" + response.length +")",
	             		content: "Source content in here"
	        			
	        			});
        				tc.addChild(cp4);        				
					},

					onGetAll: function(response) {
						//dom.byId(context.id + "WUInfoResponse").innerHTML = context.objectToText(response);
						dom.byId("showDescription").value = response.Description;
							if(response.Protected){						
								var pro = new dijit.form.CheckBox({
	       							id: "true",       							
	       							title: "Protected",
	        						checked: true
	    						});															
							}else{
								var	pro = new dijit.form.CheckBox({
	       							id: "false",       							
	       							title: "Unprotected",
	        						checked: false
	    						});				
							}
							pro.placeAt("showProtected", "first");
							
						if(response.State == "failed"){
						dom.byId("showState").innerHTML = "Failed";							
						}else{
							var completed = new dijit.form.Select({
            					name: "showCompleted",
            					options: [
                					{ label: "Failed", value: "Failed" },
                					{ label: "Completed", value: "Completed", selected: true }
               					]
        					});
        					completed.placeAt("showState", "first");
        				}        				
					}
				});
			}
		}
	});
});
