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
	"dojo/_base/fx",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/io-query",
	"dojo/ready",

	"hpcc/ECLPlaygroundWidget",

	"dijit/registry",
	"dijit/Menu",
    "dijit/MenuItem", 
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/form/Textarea",
  
], function (fx, baseWindow, dom, domStyle, domGeometry, ioQuery, ready, ECLPlaygroundWidget,registry, Menu, MenuItem, MenuBar, MenuBarItem, Textarea) {
	var initUi = function () {
		var params = ioQuery.queryToObject(dojo.doc.location.search.substr((dojo.doc.location.search.substr(0, 1) == "?" ? 1 : 0)));
/*		if (params["Widget"] == "ECLPlaygroundWidget") {
			var mainPane = registry.byId("mainPane");
			var pg = new ECLPlaygroundWidget({
				id:  "mainWidge"
			});
			mainPane.addChild(ECLPlaygroundWidget);
		}
		alert(params);
*/
		var widget = registry.byId("widget");
		widget.init(params);
	
		/************TODO****************\
		build tabs using the items in the object

	    	var tabs = ["Results","Graphs","Timings","Query","Helpers"];
	      	var tc = new TabContainer({
            style: "height: 100%; width: 100%;",
            	
        	}, "tabs");		   
	    	on(dom.byId("tabs"),function(){
    			array.forEach(tabs, function(item, i){      		
        //tab generation
        		var item = new ContentPane({
	             	title: item,	             	
	             	content: item + " go here",	             	
        		});
        		tc.addChild(item);      		   
      		    tc.startup();
      		    console.log(tabs[i]);
    			});

  			});*/
		/************TODO**************
		I want to pass the response.Description to the value: area of this textarea so it constantly updates. 
		This method will also work for anything the user saves and comes back to as a placeholder. This looks promising
		does dojo.data do this that you know of?
		**/
		var textarea = new Textarea({
            		name: "showDescription",
            		value: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
            		style: "width:300px;",
        		}, "showDescription");
		
	},

	startLoading = function (targetNode) {
		var overlayNode = dom.byId("loadingOverlay");
		if ("none" == domStyle.get(overlayNode, "display")) {
			var coords = domGeometry.getMarginBox(targetNode || baseWindow.body());
			domGeometry.setMarginBox(overlayNode, coords);
			domStyle.set(dom.byId("loadingOverlay"), {
				display: "block",
				opacity: 1
			});
		}
	},

	endLoading = function () {
		fx.fadeOut({
			node: dom.byId("loadingOverlay"),
			duration: 175,
			onEnd: function (node) {
				domStyle.set(node, "display", "none");
			}
		}).play();
	}

	return {
		init: function () {
			startLoading();
			ready(function () {
				initUi();
				endLoading();
			});
		}
	};
});
