/*##############################################################################
#    Copyright (C) 2011 HPCC Systems.
#
#    All rights reserved. This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
############################################################################## */
define([
	"dojo/_base/fx",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/on",
	"dojo/ready",
	"dijit/registry",
	"dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane",
	"dijit/Tree",
	"hpcc/BreadcrumbControl",
	"hpcc/WUQueryView",
	"hpcc/DFUQueryView",
	"hpcc/GetDFUWorkunitsView",
	"hpcc/TpTargetClusterQueryView",
	"hpcc/DropZoneFilesView",
	"hpcc/TopologyTreeStore"
], function (fx, baseWindow, dom, domStyle, domGeometry, on, ready, registry, BorderContainer, TabContainer, ContentPane, Tree, BreadcrumbControl, WUQueryView, DFUQueryView, GetDFUWorkunitsView, TpTargetClusterQueryView, DropZoneFilesView, TopologyTreeStore) {
	var dummy = null,
		breadcrumbMainControl = null,
		breadcrumbControl = null,
		pageNum = 0,
		topologyTree = null,

		wuQueryView = null,
		getDFUWorkunitsView = null,
		dfuQueryView = null,
		targetsView = null,
		dropZoneFilesView = null,

			initUi = function () {
				wuQueryView = new WUQueryView({
					onRowDblClick: function (Wuid) {
						breadcrumbControl.openPage({
							title: Wuid,
							href: "/WsWorkunits/WUInfo?Wuid=" + Wuid + "&IncludeExceptions=0&IncludeGraphs=0&IncludeSourceFiles=0&IncludeResults=0&IncludeVariables=0&IncludeTimers=0&IncludeDebugValues=0&IncludeApplicationValues=0&IncludeWorkflows&SuppressResultSchemas=1"
						});
					}
				});
				wuQueryView.placeAt("ECLWorkunitsDiv");

				dfuQueryView = new DFUQueryView({
					Prefix: "",
					onRowDblClick: function (name) {
					}
				});
				dfuQueryView.placeAt("LogicalFilesDiv");

				getDFUWorkunitsView = new GetDFUWorkunitsView({
					onRowDblClick: function (id) {
					}
				});
				getDFUWorkunitsView.placeAt("DFUWorkunitsDiv");

				targetsView = new TpTargetClusterQueryView({
					onRowDblClick: function (item) {
					}
				});
				targetsView.placeAt("TargetsDiv");

				dropZoneFilesView = new DropZoneFilesView({
					onRowDblClick: function (item) {
					}
				});
				dropZoneFilesView.placeAt("DropZoneFilesDiv");

				/*
				on(dom.byId("buttWorkunits"), "click", doShowWorkunits);
				on(dom.byId("buttLogicalFiles"), "click", doShowLogicalFiles);
				on(dom.byId("buttWorkunitsDFU"), "click", doShowDFUWorkunits);
				on(dom.byId("buttROXIE"), "click", doShowRoxie);
				on(dom.byId("buttOps"), "click", doShowOps);
				*/
				on(dom.byId("Search"), "keydown", doSearch);
				breadcrumbMainControl = new BreadcrumbControl({
					breadcrumbSheetID: "mainStack"
				});
				dojo.subscribe(breadcrumbMainControl.breadcrumbSheetID + "-selectChild", function (/* dijit */selectedChild) {
					breadcrumbControl.breadcrumbSheet.selectChild("breadcrumbMainDiv");
				});
				breadcrumbControl = new BreadcrumbControl({
					breadcrumbSheetID: "breadcrumbStack"
				});
				on(dom.byId("breadcrumbTest"), "click", doBreadcrumbTest);
				topologyTree = new Tree({
					model: new TopologyTreeStore(),
					showRoot: false,
					onClick: function (item) {
						breadcrumbControl.breadcrumbSheet.selectChild("breadcrumbMainDiv");
						if (item.id == "eclWorkunits" || item.id == "eclWorkunitsRoot") {
							breadcrumbMainControl.breadcrumbSheet.selectChild("ECLWorkunitsDiv");
							wuQueryView.setFilter(item.filter);
						} else if (item.id == "dfuWorkunits") {
							breadcrumbMainControl.breadcrumbSheet.selectChild("DFUWorkunitsDiv");
							getDFUWorkunitsView.setFilter(item.filter);
						} else if (item.id == "targets") {
							breadcrumbMainControl.breadcrumbSheet.selectChild("TargetsDiv");
							targetsView.setFilter(item.filter);
						} else if (item.type == "logicalFileFolder") {
							breadcrumbMainControl.breadcrumbSheet.selectChild("LogicalFilesDiv");
							dfuQueryView.setFilter(item.filter);
						} else if (item.type == "dropZone") {
							breadcrumbMainControl.breadcrumbSheet.selectChild("DropZoneFilesDiv");
							dropZoneFilesView.setFilter(item.filter);
						} else if (item.type == "ECLWorkunit") {
							breadcrumbControl.openPage({
								title: item.id,
								href: "/WsWorkunits/WUInfo?Wuid=" + item.id + "&IncludeExceptions=0&IncludeGraphs=0&IncludeSourceFiles=0&IncludeResults=0&IncludeVariables=0&IncludeTimers=0&IncludeDebugValues=0&IncludeApplicationValues=0&IncludeWorkflows&SuppressResultSchemas=1"
							});
						} else if (item.type == "DFUWorkunit") {
							breadcrumbControl.openPage({
								title: item.id,
								href: "/FileSpray/GetDFUWorkunit?wuid=" + item.id
							});
						} else if (item.type == "logicalFile") {
							breadcrumbControl.openPage({
								title: item.id,
								href: "/WsDfu/DFUInfo?Name=" + item.id
							});
						}
					}
				}, "topologyTreeDiv");
				topologyTree.getIconClass = function (item, opened) {
					if (item.type == 'ECLWorkunit') {
						switch (parseInt(item.data.StateID, 10)) {
							case 0:
								return "workunit_warningIcon";
							case 1:
								return "workunit_submittedIcon";
							case 2:
								return "workunit_runningIcon";
							case 3:
								return "workunit_completedIcon";
							case 4:
								return "workunit_failedIcon";
							case 5:
								return "workunit_warningIcon";
							case 6:
								return "workunit_abortingIcon";
							case 7:
								return "workunit_failedIcon";
							case 8:
								return "workunit_warningIcon";
							case 9:
								return "workunit_submittedIcon";
							case 10:
								return "workunit_warningIcon";
							case 11:
								return "workunit_submittedIcon";
							case 12:
								return "workunit_warningIcon";
							case 13:
								return "workunit_warningIcon";
							case 14:
								return "workunit_warningIcon";
							case 15:
								return "workunit_runningIcon";
						}
						return "workunitIcon";
					} else if (item.children)
						return (opened ? "dijitFolderOpened" : "dijitFolderClosed");
					else
						return "dijitLeaf";
				};

				topologyTree.startup();
			},

			doSearch = function (evt) {
				if (evt.keyCode == dojo.keys.ENTER) {
					var sheet = new ContentPane({
						title: "Search Results",
						content:
							"<div>" +
							"Look what I pretended to find:  \"" + dom.byId("Search").value + "\"" +
							"</div>"
					});
					breadcrumbControl.openRootPage(sheet);
				}
			},

			doBreadcrumbTest = function () {
				testFunction = doBreadcrumbTest;
				breadcrumbControl.openPage({
					title: "Test (" + ++pageNum + ")",
					content:
						"Breadcrumb Test (" + pageNum + "):" +
						"<div>" +
						"<button onclick='testFunction()'>Follow some link!</button>" +
						"<br />Click on the breadcrumbs you can go back without losing your position!" +
						"<br />(But openeing a new link will clear your previous position)" +
						"</div>"
				});
			},

			doShowWorkunits = function (evt) {
				var wuQueryView = new WUQueryView({
					onRowDblClick: function (Wuid) {
						breadcrumbControl.openPage({
							title: Wuid,
							href: "/WsWorkunits/WUInfo?Wuid=" + Wuid + "&IncludeExceptions=0&IncludeGraphs=0&IncludeSourceFiles=0&IncludeResults=0&IncludeVariables=0&IncludeTimers=0&IncludeDebugValues=0&IncludeApplicationValues=0&IncludeWorkflows&SuppressResultSchemas=1"
						});
					}
				});
				breadcrumbControl.openRootPage(wuQueryView.borderContainer);
			},

			doShowLogicalFiles = function (evt, scope) {
				var dfuQueryView = new DFUQueryView({
					Prefix: scope,
					onRowDblClick: function (Wuid) {
					}
				});
				breadcrumbControl.openRootPage(dfuQueryView.borderContainer);
			},

			doShowDFUWorkunits = function (evt) {
				var getDFUWorkunitsView = new GetDFUWorkunitsView({
					onRowDblClick: function (Wuid) {
						/*
						breadcrumbControl.openPage({
						title: Wuid,
						href: "/WsWorkunits/WUInfo?Wuid=" + Wuid + "&IncludeExceptions=0&IncludeGraphs=0&IncludeSourceFiles=0&IncludeResults=0&IncludeVariables=0&IncludeTimers=0&IncludeDebugValues=0&IncludeApplicationValues=0&IncludeWorkflows&SuppressResultSchemas=1"
						});
						*/
					}
				});
				breadcrumbControl.openRootPage(getDFUWorkunitsView.borderContainer);
			},

			doShowDFU = function (evt) {
				var sheet = new TabContainer({
					title: "Files (DFU)"
				});
				var wuTab = new ContentPane({
					title: "Workunits"
				});
				sheet.addChild(wuTab);
				var lfTab = new ContentPane({
					title: "Logical Files"
				});
				sheet.addChild(lfTab);
				var dzTab = new ContentPane({
					title: "Drop Zone Files"
				});
				sheet.addChild(dzTab);
				breadcrumbControl.openRootPage(sheet);
			},

			doShowRoxie = function (evt) {
				breadcrumbControl.openRootPage({
					title: evt.currentTarget.innerText,
					content: "ZZZ"
				});
			},

			doShowOps = function (evt) {
				breadcrumbControl.openRootPage({
					title: evt.currentTarget.innerText,
					content: "OPS"
				});
			},

			go = function (arg) {
				alert(arg);
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
